import { Formik, Form } from "formik";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { clearTodo, createTodo } from "../../redux/features/todoSlice";
import Alert from "../Alert/Alert";
import { Schema } from "./Form";
import Input from "./Input";

import styles from "./TodosForm.module.scss";

const TodosForm = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { todo } = useSelector((state) => state.todo);
  const submitHandler = (values, actions) => {
    dispatch(createTodo(values));
    actions.resetForm();
  };

  const initialValues = {
    title: "",
    user: JSON.parse(localStorage?.getItem("user"))?.id,
  };

  useEffect(() => {
    let timer;
    if (todo) {
      setShow(true);
      timer = setTimeout(() => {
        setShow(false);
        dispatch(clearTodo());
      }, 2000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [todo, dispatch]);

  return (
    <div className={styles.container}>
      <h3>إضافة مهمة</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={Schema}
        onSubmit={submitHandler}
      >
        <Form>
          <Input id="title" name="title" label="اسم المهمة" type="text" />
          <button type="submit" style={{ marginTop: "0" }}>
            أضف
          </button>
        </Form>
      </Formik>
      <Alert show={show}>تم إضافة المهمة</Alert>
    </div>
  );
};
export default TodosForm;
