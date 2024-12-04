use std::{future::Future, marker::PhantomData, ops::Deref, pin::Pin, sync::Arc};

pub trait Compose {
    fn compose(self, other: Self) -> Self;
}

pub enum Context<T, E> {
    Ok(T),
    Err(T, E),
}

#[repr(transparent)]
pub struct ValidationM<'a, T: 'a, E: Compose + 'a> {
    inner: Context<T, E>,
    _phantom: PhantomData<&'a ()>,
}

impl<'a, T: 'a, E: Compose + 'a> ValidationM<'a, T, E> {
    pub fn pure(value: T) -> Self {
        Self {
            inner: Context::Ok(value),
            _phantom: PhantomData,
        }
    }

    pub fn fail(value: T, err: E) -> Self {
        Self {
            inner: Context::Err(value, err),
            _phantom: PhantomData,
        }
    }

    pub fn bind<U: 'a, F>(self, f: F) -> ValidationM<'a, U, E>
    where
        F: Fn(T) -> ValidationM<'a, U, E>,
    {
        match self.inner {
            Context::Ok(value) => f(value),
            Context::Err(value, e1) => match f(value).inner {
                Context::Ok(value) => ValidationM {
                    inner: Context::Err(value, e1),
                    _phantom: PhantomData,
                },
                Context::Err(value, e2) => ValidationM {
                    inner: Context::Err(value, e1.compose(e2)),
                    _phantom: PhantomData,
                },
            },
        }
    }

    pub async fn async_bind<U: 'a, F, Fut>(self, f: F) -> ValidationM<'a, U, E>
    where
        F: Fn(T) -> Fut,
        Fut: Future<Output = ValidationM<'a, U, E>>,
    {
        match self.inner {
            Context::Ok(val) => f(val).await,
            Context::Err(val, e1) => match f(val).await.inner {
                Context::Ok(val) => ValidationM {
                    inner: Context::Err(val, e1),
                    _phantom: PhantomData,
                },
                Context::Err(val, e2) => ValidationM {
                    inner: Context::Err(val, e1.compose(e2)),
                    _phantom: PhantomData,
                },
            },
        }
    }
}

impl<'a, T: 'a, E: Compose + 'a> Deref for ValidationM<'a, T, E> {
    type Target = Context<T, E>;
    fn deref(&self) -> &Self::Target {
        &self.inner
    }
}

type AsyncValidation<'a, T, E> = Pin<Box<dyn Future<Output = ValidationM<'a, T, E>> + 'a>>;

pub struct Validator<'a, T: 'a, U: 'a, E: Compose + 'a>(
    Arc<dyn Fn(T) -> AsyncValidation<'a, U, E> + 'a>,
);

impl<'a, T: 'a, U: 'a, E: Compose + 'a> Validator<'a, T, U, E> {
    pub fn lift<F>(f: F) -> Self
    where
        F: Fn(T) -> AsyncValidation<'a, U, E> + 'a,
    {
        Validator(Arc::new(f))
    }

    pub async fn validate(&self, value: T) -> ValidationM<U, E> {
        (self.0)(value).await
    }

    pub fn compose<V: 'a>(self, other: Validator<'a, U, V, E>) -> Validator<'a, T, V, E> {
        Validator(Arc::new(move |value: T| {
            let self_fn = self.0.clone();
            let other_fn = other.0.clone();
            Box::pin(async move {
                let res1 = self_fn(value).await;
                res1.async_bind(|val| other_fn(val)).await
            })
        }))
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::marker::PhantomData;

    // Test-only error type
    #[derive(Debug, PartialEq, Clone)]
    struct ValidationError(String);

    impl Compose for ValidationError {
        fn compose(self, other: Self) -> Self {
            ValidationError(format!("{} AND {}", self.0, other.0))
        }
    }

    // Test-only helper functions
    fn create_test_validator<'a>(
        error_msg: &'static str,
    ) -> Validator<'a, i32, i32, ValidationError> {
        Validator::lift(move |x: i32| {
            Box::pin(async move {
                if x > 0 {
                    ValidationM::pure(x)
                } else {
                    ValidationM {
                        inner: Context::Err(x, ValidationError(error_msg.to_string())),
                        _phantom: PhantomData,
                    }
                }
            })
        })
    }

    // Test utilities for string validation
    fn create_not_empty_validator<'a>() -> Validator<'a, String, String, ValidationError> {
        Validator::lift(|x: String| {
            Box::pin(async move {
                if !x.trim().is_empty() {
                    ValidationM::pure(x)
                } else {
                    ValidationM {
                        inner: Context::Err(
                            x,
                            ValidationError("String cannot be empty".to_string()),
                        ),
                        _phantom: PhantomData,
                    }
                }
            })
        })
    }

    fn create_max_length_validator<'a>(
        max_len: usize,
    ) -> Validator<'a, String, String, ValidationError> {
        Validator::lift(move |x: String| {
            Box::pin(async move {
                if x.len() <= max_len {
                    ValidationM::pure(x)
                } else {
                    ValidationM {
                        inner: Context::Err(x, ValidationError("String too long".to_string())),
                        _phantom: PhantomData,
                    }
                }
            })
        })
    }

    #[tokio::test]
    async fn test_pure_validation() {
        let validation: ValidationM<'_, i32, ValidationError> = ValidationM::pure(42);
        match validation.inner {
            Context::Ok(value) => assert_eq!(value, 42),
            Context::Err(_, _) => panic!("Expected Ok variant"),
        }
    }

    #[tokio::test]
    async fn test_single_validation_success() {
        let validator = create_test_validator("Must be positive");
        let result = validator.validate(5).await;

        match result.inner {
            Context::Ok(value) => assert_eq!(value, 5),
            Context::Err(_, _) => panic!("Expected successful validation"),
        }
    }

    #[tokio::test]
    async fn test_single_validation_failure() {
        let validator = create_test_validator("Must be positive");
        let result = validator.validate(-5).await;

        match result.inner {
            Context::Ok(_) => panic!("Expected validation failure"),
            Context::Err(value, error) => {
                assert_eq!(value, -5);
                assert_eq!(error.0, "Must be positive");
            }
        }
    }

    #[tokio::test]
    async fn test_composed_validation_both_success() {
        let validator1 = create_test_validator("First check failed");
        let validator2 = create_test_validator("Second check failed");

        let composed = validator1.compose(validator2);
        let result = composed.validate(5).await;

        match result.inner {
            Context::Ok(value) => assert_eq!(value, 5),
            Context::Err(_, _) => panic!("Expected successful validation"),
        }
    }

    #[tokio::test]
    async fn test_composed_validation_first_fails() {
        let validator1 = create_test_validator("First check failed");
        let validator2 = create_test_validator("Second check failed");
        let composed = validator1.compose(validator2);
        let result = composed.validate(-5).await;
        match result.inner {
            Context::Ok(_) => panic!("Expected validation failure"),
            Context::Err(value, error) => {
                assert_eq!(value, -5);
                assert_eq!(error.0, "First check failed AND Second check failed");
            }
        }
    }

    #[tokio::test]
    async fn test_composed_validation_second_fails() {
        let validator1 = Validator::lift(|x: i32| Box::pin(async move { ValidationM::pure(-x) }));
        let validator2 = create_test_validator("Second check failed");

        let composed = validator1.compose(validator2);
        let result = composed.validate(5).await;

        match result.inner {
            Context::Ok(_) => panic!("Expected validation failure"),
            Context::Err(value, error) => {
                assert_eq!(value, -5);
                assert_eq!(error.0, "Second check failed");
            }
        }
    }

    #[tokio::test]
    async fn test_async_validation() {
        let async_validator = Validator::lift(|x: i32| {
            Box::pin(async move {
                tokio::time::sleep(std::time::Duration::from_millis(100)).await;
                if x > 10 {
                    ValidationM::pure(x)
                } else {
                    ValidationM {
                        inner: Context::Err(
                            x,
                            ValidationError("Value must be greater than 10".to_string()),
                        ),
                        _phantom: PhantomData,
                    }
                }
            })
        });

        let result = async_validator.validate(5).await;
        match result.inner {
            Context::Ok(_) => panic!("Expected validation failure"),
            Context::Err(value, error) => {
                assert_eq!(value, 5);
                assert_eq!(error.0, "Value must be greater than 10");
            }
        }
    }

    #[tokio::test]
    async fn test_monad_laws_identity() {
        let value = 42;
        let f = |x| ValidationM::<'_, i32, ValidationError>::pure(x + 1);

        let left = ValidationM::pure(value).bind(f);
        let right = f(value);

        match (left.inner, right.inner) {
            (Context::Ok(l), Context::Ok(r)) => assert_eq!(l, r),
            _ => panic!("Expected both sides to be Ok"),
        }
    }

    #[tokio::test]
    async fn test_practical_validation_rules() {
        let not_empty = create_not_empty_validator();
        let max_length = create_max_length_validator(10);

        let composed = not_empty.compose(max_length);

        // Test valid input
        let result1 = composed.validate("Valid".to_string()).await;
        match result1.inner {
            Context::Ok(value) => assert_eq!(value, "Valid"),
            Context::Err(_, _) => panic!("Expected successful validation"),
        }

        // Test empty input
        let result2 = composed.validate("".to_string()).await;
        match result2.inner {
            Context::Ok(_) => panic!("Expected validation failure"),
            Context::Err(_, error) => assert_eq!(error.0, "String cannot be empty"),
        }

        // Test too long input
        let result3 = composed.validate("ThisStringIsTooLong".to_string()).await;
        match result3.inner {
            Context::Ok(_) => panic!("Expected validation failure"),
            Context::Err(_, error) => assert_eq!(error.0, "String too long"),
        }
    }
}
