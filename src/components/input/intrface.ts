import { HTMLInputTypeAttribute } from "react";
import { FieldErrors, FieldValues } from "react-hook-form";

export default interface iInput {
  htmlFor?: string;
  label?: string;
  placeholder?: string;
  type: HTMLInputTypeAttribute | undefined;
  value?: string;
  func?: () => void;
  schema?: any;
  name?: string;
}
