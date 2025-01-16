import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";

import css from "./Logo.module.css";

const Logo = () => {
  return (
    <NavLink to="/" className={css.logo}>
      <img src={logo} alt="Site logo" className={css.navLogo} />
    </NavLink>
  );
};

export default Logo;
