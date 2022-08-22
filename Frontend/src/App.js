import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/Login/ForgetPassword/ForgetPassword";
import Signup from "./pages/Signup/Signup";
import Loading from "./components/Loading/Loading";
import { loggedIn, logoutUser } from "./redux/features/userSlice";
import ResetPassword from "./pages/Login/ResetPassword/ResetPassword";
import { useState } from "react";
import { clearTodos } from "./redux/features/todoSlice";

function App() {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const todoState = useSelector((state) => state.todo);

  useEffect(() => {
    if (
      todoState.error?.message?.startsWith("Your token has expired!") ||
      todoState.error?.message?.startsWith("NotFound Login again!") ||
      todoState.error?.message?.startsWith(
        "Invalid token. Please log in again!"
      )
    ) {
      dispatch(logoutUser());
      dispatch(clearTodos());
    }
  }, [dispatch, todoState.error]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(loggedIn());
      setShow(true);
    }
    setShow(true);
  }, [dispatch]);

  return (
    <div className="App">
      {show && (
        <>
          <Navbar />
          {userState.isLoading && <Loading />}
          <div className="pages">
            <Routes>
              <Route
                path="/"
                element={userState.user ? <Home /> : <Navigate to={"/login"} />}
              />
              <Route
                path="/login"
                element={!userState.user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/signup"
                element={!userState.user ? <Signup /> : <Navigate to="/" />}
              />
              <Route
                path="/forgetPassword"
                element={
                  !userState.user ? <ForgotPassword /> : <Navigate to="/" />
                }
              />
              <Route
                path="/resetPassword/:token"
                element={
                  !userState.user ? <ResetPassword /> : <Navigate to="/" />
                }
              />
              <Route path="*" element={<Home />} />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
