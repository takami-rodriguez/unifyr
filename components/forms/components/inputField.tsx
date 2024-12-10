import * as React from "react";
import { Label } from "./label";
import { Input } from "./input";



interface InputFieldProps
  extends React.RefAttributes<HTMLInputElement>,
    React.ComponentProps<"input"> {
  label: string;
}

const InputField = ({
  label,
  name,
  placeholder,
}: InputFieldProps) => {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      <Input name={name} placeholder={placeholder} />
    </div>
  );
};

export default InputField;
