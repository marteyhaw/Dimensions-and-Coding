import { useNavigate } from "react-router-dom";

function LoginButton() {
  const navigate = useNavigate();

  const logInClick = () => {
    navigate(`/ground-7-rule/login`);
  };

  return (
    <div>
      <div
        className="navbar-brand text-center text-warning"
        to="/ground-7-rule/"
      >
        <img
          src={require("./img/offplay.png")}
          alt=""
          width="80"
          height="80"
          className="d-inline-block align-top mr-2 "
          onClick={logInClick}
        />
        <div>LOGIN</div>
      </div>
    </div>
  );
}

export default LoginButton;
