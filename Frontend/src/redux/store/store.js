import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import todoSlice from "../features/todoSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    todo: todoSlice,
  },
});

export default store;
