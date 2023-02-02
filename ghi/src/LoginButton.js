import { NavLink } from "react-router-dom";

function LoginButton() {
  return (
    <NavLink
      className="navbar-brand text-center text-warning"
      to="/ground-7-rule/login"
    >
      <img
        src={require("./img/offplay-wborder.png")}
        alt=""
        width="80"
        height="80"
        className="d-inline-block align-top mr-2 "
      />
      <div>LOGIN</div>
    </NavLink>
  );
}

export default LoginButton;
