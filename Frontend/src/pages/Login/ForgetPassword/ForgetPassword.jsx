import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialValues, resetSchema } from "./Form";
import { useNavigate } from "react-router-dom";

import { clearAll, forgetPassword } from "../../../redux/features/userSlice";
import Alert from "../../../components/Alert/Alert";
import ForgetResetPassword from "../../../components/ForgetResetPassword/ForgetResetPassword";

const ForgetPassword = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { passwordReset } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const submitHandler = (values, actions) => {
    dispatch(forgetPassword(values));
    actions.resetForm();
  };

  useEffect(() => {
    let timer;
    if (passwordReset) {
      setShow(true);
      timer = setTimeout(() => {
        dispatch(clearAll());
        setShow(false);
        navigate("/");
      }, 2500);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [passwordReset, dispatch, navigate]);

  return (
    <>
      <ForgetResetPassword
        initialValues={initialValues}
        submitHandler={submitHandler}
        schema={resetSchema}
        btn="ارسال"
        header="استعادة كلمة المرور"
        label="إيميل"
        name="email"
      />
      <Alert show={show}>{passwordReset?.message}</Alert>
    </>
  );
};
export default ForgetPassword;
