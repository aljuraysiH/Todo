import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  clearAll,
  clearErrors,
  registerUser,
} from "../../redux/features/userSlice";
import { clearTodo } from "../../redux/features/todoSlice";
import CustomForm from "../../components/Form/CustomForm";

const Signup = () => {
  const dispatch = useDispatch();
  const { error, user } = useSelector((state) => state.user);

  const onSubmit = (values, actions) => {
    dispatch(registerUser(values));
    if (user) actions.resetForm();
  };

  useEffect(() => {
    dispatch(clearTodo());
    dispatch(clearAll());
    dispatch(clearErrors());
  }, [dispatch]);

  return (
    <>
      {!user && (
        <div className="form__container">
          <h2>تسجيل</h2>
          {error && (
            <div className="error">
              <p>{error?.message}</p>
            </div>
          )}
          <CustomForm submitHandler={onSubmit} type="تسحيل" />
        </div>
      )}
    </>
  );
};
export default Signup;
