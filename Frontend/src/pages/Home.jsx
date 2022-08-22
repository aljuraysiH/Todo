import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Todos from "../components/Todos/Todos";
import TodosForm from "../components/TodosForm/TodosForm";
import { getTodos } from "../redux/features/todoSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      dispatch(getTodos());
    }
  }, [dispatch]);

  return (
    <div className="main__container">
      <TodosForm />
      {<Todos />}
    </div>
  );
};
export default Home;
