import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const registerUser = createAsyncThunk(
  "user/register",
  async (user, thunkAPI) => {
    try {
      const res = await axios.post("/user/signup", user);

      localStorage.setItem("token", JSON.stringify(res?.data?.token));
      localStorage.setItem("user", JSON.stringify(res?.data?.user));
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (user, thunkAPI) => {
    try {
      const res = await axios.post("/user/login", user);

      localStorage.setItem("token", JSON.stringify(res?.data?.token));
      localStorage.setItem("user", JSON.stringify(res?.data?.user));
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, thunkAPI) => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "user/forgetPassword",
  async (userEmail, thunkAPI) => {
    try {
      const { data } = await axios.post("user/forgetPassword", userEmail);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (info, thunkAPI) => {
    try {
      const res = await axios.patch(`/user/resetPassword/${info.token}`, {
        password: info.password,
      });
      localStorage.setItem("token", JSON.stringify(res?.data?.token));
      localStorage.setItem("user", JSON.stringify(res?.data?.user));
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

const initialState = {
  user: "",
  isLoading: false,
  error: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loggedIn: (state) => {
      state.user = JSON.parse(localStorage.getItem("user"));
    },
    clearAll: () => initialState,
    clearErrors: (state) => (state.error = undefined),
  },
  extraReducers: (builder) => {
    // Register
    builder.addCase(registerUser.pending, (state, action) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = undefined;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.user = "";
    });

    // Login
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = undefined;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.user = "";
    });

    // Logout
    builder.addCase(logoutUser.pending, (state, action) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = undefined;
      state.user = "";
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // ForgetPassword
    builder.addCase(forgetPassword.pending, (state, action) => {
      state.isLoading = true;
      state.error = undefined;
      state.passwordReset = undefined;
    });
    builder.addCase(forgetPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.passwordReset = action.payload;
      state.error = null;
    });
    builder.addCase(forgetPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.passwordReset = undefined;
    });

    // ResetPassword
    builder.addCase(resetPassword.pending, (state, action) => {
      state.isLoading = true;
      state.error = undefined;
      state.passwordChange = undefined;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.passwordChange = true;
      state.user = action.payload;
      state.isLoading = false;
      state.error = undefined;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.user = "";
      state.passwordChange = undefined;
    });
  },
});

export const { loggedIn, clearAll, clearErrors } = userSlice.actions;
export default userSlice.reducer;
