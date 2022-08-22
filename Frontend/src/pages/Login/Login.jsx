import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  clearAll,
  clearErrors,
  loginUser,
} from "../../redux/features/userSlice";
import { clearTodo } from "../../redux/features/todoSlice";
import CustomForm from "../../components/Form/CustomForm";

const Login = () => {
  const dispatch = useDispatch();
  const { error, user } = useSelector((state) => state.user);

  const onSubmit = (values, actions) => {
    dispatch(loginUser(values));

    if (user) actions.resetForm();
  };

  useEffect(() => {
    dispatch(clearTodo());
    dispatch(clearAll());
    dispatch(clearErrors());
  }, [dispatch]);

  return (
    <>
      <div className="form__container">
        <h2>تسجيل دخول</h2>
        {error && (
          <div className="error">
            <p>{error?.message}</p>
          </div>
        )}
        <CustomForm submitHandler={onSubmit} type="تسجيل دخول" />
      </div>
    </>
  );
};
export default Login;
