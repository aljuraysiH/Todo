import { useField } from "formik";

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id}>{label}</label>
      <input className="input" {...props} {...field} />
      {meta.touched && meta.error && (
        <div className="error">
          <p>{meta.error}</p>
        </div>
      )}
    </>
  );
};
export default Input;
