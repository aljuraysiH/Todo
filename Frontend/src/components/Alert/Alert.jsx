import styles from "./Alert.module.scss";

const Alert = ({ children, show }) => {
  return (
    <div className={`${styles.alertContainer} ${show ? styles.show : ""}`}>
      <h3>{children}</h3>
    </div>
  );
};
export default Alert;
