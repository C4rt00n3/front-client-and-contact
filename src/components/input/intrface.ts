import { HTMLInputTypeAttribute } from "react";

export default interface iInput {
  htmlFor?: string;
  label?: string;
  placeholder?: string;
  type: HTMLInputTypeAttribute | undefined;
  value?: string;
  schema?: any;
  name?: string;
}
