import { useNavigate } from "react-router-dom";

function SignUpButton() {
  const navigate = useNavigate();

  const signInClick = () => {
    navigate(`/signup`);
  };

  return (
    <div>
      <button onClick={signInClick} className="btn btn-outline-light">
        Sign up
      </button>
    </div>
  );
}

export default SignUpButton;
