import { HTMLInputTypeAttribute } from "react";

export default interface iInput {
  htmlFor?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  func?: () => void;
  schema?: any;
  name: string;
}
