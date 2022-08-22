import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Input from "./Input";
import { clearErrors } from "../../redux/features/userSlice";

const ForgetResetPassword = ({
  initialValues,
  submitHandler,
  schema,
  btn,
  header,
  label,
  name,
  type = "text",
}) => {
  const { error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  return (
    <div className="form__container">
      <h2>{header}</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={submitHandler}
        validationSchema={schema}
      >
        <Form>
          <Input id={name} name={name} label={label} type={type} />
          {error && (
            <div className="error">
              <p>{error?.message}</p>
            </div>
          )}
          <button type="submit">{btn}</button>
        </Form>
      </Formik>
    </div>
  );
};
export default ForgetResetPassword;
