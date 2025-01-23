import * as React from "react";
import { Label } from "./label";
import { Input } from "./input";

interface InputFieldProps
  extends React.RefAttributes<HTMLInputElement>,
    React.ComponentProps<"input"> {
  label: string;
  error?: string;
}

const InputField = ({ label, error, ...inputProps }: InputFieldProps) => {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      <div className="relative">
        <Input {...inputProps} error={error} />
        <div className="absolute -bottom-5 text-sm text-red-500">{error}</div>
      </div>
    </div>
  );
};

export default InputField;
