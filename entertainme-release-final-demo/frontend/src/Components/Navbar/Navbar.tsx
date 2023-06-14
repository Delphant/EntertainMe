import styles from "../Navbar/Navbar.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import Menu from "./Menu";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const withBurger = <Menu />;

  const withoutBurger = (
    <div className={styles.navbar}>
      <div className={styles.clicker} onClick={() => navigate("/")}>
        EntertainMe
        <a className={styles.orange}>!</a>
      </div>
    </div>
  );

  let element =
    location.pathname === "/" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/create-account"
      ? withoutBurger
      : withBurger;

  return <>{element}</>;
};

export default Navbar;
