import { useNavigate, NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useLogOutMutation } from "./store/authApi";
import { updateField } from "./store/charSlice";
import { useDispatch } from "react-redux";

function LogoutButton() {
  const navigate = useNavigate();
  const [logOut, { data }] = useLogOutMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(
        updateField({
          field: "stored_char_details",
          value: null,
        })
      );
      dispatch(
        updateField({
          field: "active_character",
          value: "",
        })
      );
      navigate("/ground-7-rule/");
    }
  }, [data, navigate, dispatch]);

  return (
    <NavLink className="navbar-brand text-center text-warning" to="#">
      <img
        src={require("./img/newdoor-wborder.png")}
        alt=""
        style={{ maxHeight: "64px" }}
        className="d-inline-block align-top mr-2 "
        onClick={logOut}
      />
      <div>LOGOUT</div>
    </NavLink>
  );
}

export default LogoutButton;
