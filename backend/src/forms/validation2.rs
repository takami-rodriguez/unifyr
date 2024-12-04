pub trait Compose {
    fn compose(self, other: Self) -> Self;
}

pub enum Context<'a, T, E> {
    Ok(&'a T),
    Err(&'a T, E),
}

pub struct ValidationM<'a, T, E: Compose>(Context<'a, T, E>);

impl<'a, T, E: Compose> ValidationM<'a, T, E> {
    pub fn pure(value: &'a T) -> Self {
        Self(Context::Ok(value))
    }

    pub fn fail(value: &'a T, err: E) -> Self {
        Self(Context::Err(value, err))
    }
}

impl<'a, T, E: Compose> Compose for ValidationM<'a, T, E> {
    fn compose(self, other: Self) -> Self {
        match self.0 {
            Context::Ok(_) => other,
            Context::Err(_, err1) => match other.0 {
                Context::Ok(value) => ValidationM::fail(value, err1),
                Context::Err(value, err2) => ValidationM::fail(value, err1.compose(err2)),
            },
        }
    }
}
