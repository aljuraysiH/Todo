import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import ForgetResetPassword from "../../../components/ForgetResetPassword/ForgetResetPassword";
import { resetPassword } from "../../../redux/features/userSlice";
import { initialValues, schema } from "./Form";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);

  const submitHandler = (values, actions) => {
    dispatch(resetPassword({ ...values, token }, token));
    actions.resetForm();
  };

  useEffect(() => {
    if (token?.length !== 64) {
      navigate("/");
    } else if (
      error?.message?.startsWith("انتهت صلاحية التوكن حاول مره ثانية")
    ) {
      let timer = setTimeout(() => {
        navigate("/forgetPassword");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [token, dispatch, navigate, error]);

  return (
    <>
      <ForgetResetPassword
        initialValues={initialValues}
        submitHandler={submitHandler}
        schema={schema}
        btn="تغيير كلمة المرور"
        header="تغيير كلمة المرور"
        label="كلمة المرور"
        name="password"
        type="password"
      />
    </>
  );
};
export default ResetPassword;
