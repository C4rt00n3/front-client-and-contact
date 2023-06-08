export default interface iInput {
  htmlFor?: string;
  label?: string;
  placeholder?: string;
  children?: React.ReactNode;
  func?: () => void;
  schema?: any;
  name: string;
}
