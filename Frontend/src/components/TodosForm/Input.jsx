import { useField } from "formik";

import styles from "./TodosForm.module.scss";

const Input = ({ id, label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id}>{label}</label>
      <div>
        <input
          {...field}
          {...props}
          className={`${styles.input} ${
            meta.error && meta.touched ? styles.inputError : ""
          }`}
        />
        {meta.error && meta.touched && (
          <div className={styles.error}>
            <p>{meta.error}</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Input;
