import iInput from "./intrface";

const TextArea = ({
  htmlFor,
  value,
  label,
  placeholder,
  func,
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
        {value}
      </textarea>
    </>
  );
};

export default TextArea;
