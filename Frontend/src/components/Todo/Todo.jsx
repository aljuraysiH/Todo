import { CheckSquare, Square, Trash } from "phosphor-react";
import { useDispatch } from "react-redux";

import {
  deleteTodo,
  completeTodo,
  unCompleteTodo,
} from "../../redux/features/todoSlice";

import styles from "./Todo.module.scss";

const Todo = ({ title, id, completed }) => {
  const dispatch = useDispatch();

  return (
    <div
      className={`${styles.todoContainer} ${completed ? styles.completed : ""}`}
    >
      {(completed && (
        <CheckSquare
          size={32}
          color="#212529"
          onClick={() => dispatch(unCompleteTodo(id))}
        />
      )) || (
        <Square
          size={32}
          color="#212529"
          onClick={() => dispatch(completeTodo(id))}
        />
      )}
      <div>
        <h3>{title}</h3>
      </div>
      <Trash
        size={32}
        color="#212529"
        onClick={() => dispatch(deleteTodo(id))}
      />
    </div>
  );
};
export default Todo;
