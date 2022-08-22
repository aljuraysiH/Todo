import { useField } from "formik";

const CustomInput = ({ id, label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div className="container">
        <label htmlFor={id}>{label}</label>
        <input
          {...field}
          {...props}
          className={`input ${meta.error && meta.touched ? "inputError" : ""}`}
        />
        {meta.error && meta.touched && (
          <div className="error">
            <p>{meta.error}</p>
          </div>
        )}
      </div>
    </>
  );
};
export default CustomInput;
