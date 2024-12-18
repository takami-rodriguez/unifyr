import React from "react";

type FormWrapperProps = {
  children: React.ReactNode;
  id:string
};

const FormWrapper = ({ children,id }: FormWrapperProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.error("Handle Validation",id);
    console.log("Form submitted",id);
  };

  return <form onSubmit={handleSubmit}>{children}</form>;
};

export default FormWrapper;
