import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLogOutMutation } from './store/authApi';


function LogoutButton() {
  const navigate = useNavigate();
  const [logOut, { data }] = useLogOutMutation();

  useEffect(() => {
    if (data) {
      navigate('/');
    }
  }, [data, navigate]);

  return (
    <div>
      <button onClick={logOut} className="btn btn-outline-info">
        Log out
      </button>
    </div>
  );
}

export default LogoutButton;
