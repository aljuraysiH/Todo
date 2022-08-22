import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearTodos } from "../../redux/features/todoSlice";

import { logoutUser } from "../../redux/features/userSlice";

import styles from "./Navbar.module.scss";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  return (
    <nav className={styles.nav}>
      <Link to={"/"}>الصفحة الرئيسية</Link>
      {!user && (
        <div>
          <Link to="/signup">تسجيل</Link>
          <Link to="/login">تسجيل دخول</Link>
        </div>
      )}
      {user && (
        <div>
          <Link
            to="/"
            onClick={() => {
              dispatch(logoutUser());
              dispatch(clearTodos());
            }}
          >
            Logout
          </Link>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
