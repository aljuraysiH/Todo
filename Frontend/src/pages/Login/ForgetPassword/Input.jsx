import { useField } from "formik";
import styles from "./ForgetPassword.module.scss";

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label className={styles.label} htmlFor={props.id}>
        {label}
      </label>
      <input {...props} {...field} className="input" />
      {meta.touched && meta.error && (
        <div className={styles.error}>
          <p>{meta.error}</p>
        </div>
      )}
    </>
  );
};
export default Input;
