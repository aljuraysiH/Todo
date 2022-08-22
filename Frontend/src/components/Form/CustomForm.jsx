import { Formik, Form } from "formik";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { initialValues } from "./Formik";
import { schema } from "./Schema";
import CustomInput from "../CustomInput/CustomInput";

import styles from "./Form.module.scss";

const CustomForm = ({ type, submitHandler }) => {
  const { isLoading } = useSelector((state) => state.user);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={submitHandler}
    >
      {() => (
        <Form>
          <CustomInput label="إيميل" type="text" name="email" id="email" />
          <CustomInput
            label="كلمة المرور"
            type="password"
            name="password"
            id="password"
          />
          {type === "تسجيل دخول" && (
            <h3>
              <Link to="/forgetPassword">نسيت كلمة المرور؟</Link>
            </h3>
          )}
          <button
            disabled={isLoading ? true : false}
            style={isLoading ? { cursor: "not-allowed" } : null}
            type="submit"
          >
            {type}
          </button>
        </Form>
      )}
    </Formik>
  );
};
export default CustomForm;
