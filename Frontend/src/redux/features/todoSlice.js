import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const createTodo = createAsyncThunk(
  "todo/create",
  async (todo, thunkAPI) => {
    try {
      const { data } = await axios.post("/todo", todo, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          Accept: "application/json",
        },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todo/delete",
  async (todoId, thunkAPI) => {
    try {
      const { data } = await axios.delete(`/todo/${todoId}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          Accept: "application/json",
        },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const completeTodo = createAsyncThunk(
  "todo/complete",
  async (todoId, thunkAPI) => {
    try {
      const { data } = await axios.patch(`/todo/${todoId}`, "", {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          Accept: "application/json",
        },
      });
      return data.todo;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const unCompleteTodo = createAsyncThunk(
  "todo/unComplete",
  async (todoId, thunkAPI) => {
    try {
      const { data } = await axios.patch(`/todo/unCompleteTodo/${todoId}`, "", {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          Accept: "application/json",
        },
      });
      return data.todo;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const getTodos = createAsyncThunk("todo/todos", async (_, thunkAPI) => {
  try {
    const { data } = await axios.get("/todo", {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        Accept: "application/json",
      },
    });
    return data.todos;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data);
  }
});

const initialState = {
  todo: null,
  isLoading: false,
  error: null,
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    clearTodo: (state) => {
      state.todo = null;
    },
    clearTodos: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder.addCase(createTodo.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
      state.todo = null;
    });
    builder.addCase(createTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.todos.unshift(action.payload.todo);
      state.todo = action.payload;
      state.error = null;
    });
    builder.addCase(createTodo.rejected, (state, action) => {
      state.isLoading = false;
      state.todo = null;
      state.error = action.payload;
    });
    builder.addCase(getTodos.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
      state.error = null;
    });
    builder.addCase(getTodos.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteTodo.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.todos = state.todos.filter(
        (todo) => todo._id !== action.payload.id.toString()
      );
      state.error = null;
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(completeTodo.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(completeTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.todos = state.todos.map((todo) => {
        if (todo._id === action.payload.id.toString())
          todo.completed = !todo.completed;
        return todo;
      });
      state.error = null;
    });
    builder.addCase(completeTodo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(unCompleteTodo.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(unCompleteTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.todos = state.todos.map((todo) => {
        if (todo._id === action.payload.id.toString())
          todo.completed = !todo.completed;
        return todo;
      });
      state.error = null;
    });
    builder.addCase(unCompleteTodo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { clearTodo, clearTodos } = todoSlice.actions;
export default todoSlice.reducer;
