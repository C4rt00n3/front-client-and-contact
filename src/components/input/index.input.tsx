import iInput from "./intrface";

const Input = ({
  htmlFor,
  label,
  placeholder,
  type,
  func,
  schema,
  name,
}: iInput) => {
  return (
    <>
      {label == "" ? <></> : <label htmlFor={htmlFor}>{label}</label>}
      <input
        {...schema}
        name={name}
        id={htmlFor}
        placeholder={placeholder}
        type={type}
      />
    </>
  );
};

export default Input;
