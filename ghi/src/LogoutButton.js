import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLogOutMutation } from "./store/authApi";

function LogoutButton() {
  const navigate = useNavigate();
  const [logOut, { data }] = useLogOutMutation();

  useEffect(() => {
    if (data) {
      navigate("/ground-7-rule/");
    }
  }, [data, navigate]);

  return (
    <div className="navbar-brand text-center text-warning" to="/ground-7-rule/">
      <img
        src={require("./img/newdoor.png")}
        alt=""
        width="64"
        height="64"
        className="d-inline-block align-top mr-2 "
        onClick={logOut}
      />
      <div>LOGOUT</div>
    </div>
  );
}

export default LogoutButton;
