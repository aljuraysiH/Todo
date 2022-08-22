import { useSelector } from "react-redux";

import Pagination from "../../pagination/Pagination";

const Todos = () => {
  const { todos } = useSelector((state) => state.todo);
  const completedTodos = todos.filter((todo) => todo.completed);
  const uncompletedTodos = todos.filter((todo) => !todo.completed);
  const allTdos = [...uncompletedTodos, ...completedTodos];

  return (
    <div>
      {allTdos?.length < 1 && <h2>لا يوجد لديك أي مهام</h2>}
      {allTdos && <Pagination list={allTdos} />}
    </div>
  );
};
export default Todos;
