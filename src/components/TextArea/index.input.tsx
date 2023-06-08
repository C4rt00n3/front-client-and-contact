import iInput from "./intrface";

const TextArea = ({
  htmlFor,
  children,
  label,
  placeholder,
  schema,
  name,
}: iInput) => {
  return (
    <>
      {label == "" ? <></> : <label htmlFor={htmlFor}>{label}</label>}
      <textarea
        autoComplete="on"
        autoFocus={false}
        rows={1}
        id={htmlFor}
        {...schema}
        name={name}
        placeholder={placeholder}
      >
        {children}
      </textarea>
    </>
  );
};

export default TextArea;
