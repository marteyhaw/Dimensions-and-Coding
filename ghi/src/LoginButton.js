import { useNavigate } from "react-router-dom";


function LoginButton() {
  const navigate = useNavigate();

  const logInClick = () => {
        navigate(`/login`);
    };

  return (
    <div>
      <button onClick={logInClick} className="btn btn-outline-light">
        Log in
      </button>
    </div>
  );
}

export default LoginButton;
