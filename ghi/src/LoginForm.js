import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLogInMutation } from "./store/authApi";
import { updateField } from "./store/accountSlice";
import Notification from "./Notifications";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const dispatch = useDispatch();
  const { username, password } = useSelector((state) => state.account);
  const [logIn, { error, isLoading: logInLoading }] = useLogInMutation();
  const field = useCallback(
    (e) =>
      dispatch(updateField({ field: e.target.name, value: e.target.value })),
    [dispatch]
  );
  const navigate = useNavigate();

  const attemptSubmit = async (e) => {
    e.preventDefault();
    const email = username;
    const response = await logIn({
      email,
      password,
    });
    if (response.data) {
      navigate("/ground-7-rule/");
    }
  };

  return (
    <>
      <div className="home-bg">
        <div className="row">
          <div className="offset-3 col-6 text-white">
            <div className="shadow p-4 mt-4">
              <p className="whiteText text-center h3">
                Slayer, welcome back to the Battlefield. Your kingdom awaits
                upon your arrival.
              </p>
            </div>
            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
              Login
            </p>
            {error ? (
              <Notification type="danger">{error.data.detail}</Notification>
            ) : null}
            <form method="POST" onSubmit={(e) => attemptSubmit(e)}>
              <div className="d-flex flex-row align-items-center mb-4 ">
                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                <div className="form-outline flex-fill mb-0">
                  <label className="label" htmlFor="username">
                    Username
                  </label>
                  <div className="control">
                    <input
                      required
                      onChange={field}
                      value={username}
                      name="username"
                      id="username"
                      className="form-control"
                      type="email"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
              </div>

              <div className="d-flex flex-row align-items-center mb-4 ">
                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                <div className="form-outline flex-fill mb-0">
                  <label className="label" htmlFor="password">
                    Password
                  </label>
                  <div className="control">
                    <input
                      required
                      onChange={field}
                      value={password}
                      name="password"
                      id="password"
                      className="form-control"
                      type="password"
                      placeholder="Password"
                    />
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button
                  disabled={logInLoading}
                  className="btn btn-primary btn-lg"
                >
                  Sign in
                </button>
              </div>
            </form>
            <div className="text-center">
              <button variant="body2">
                {" "}
                Not a member of our Kingdom?{" "}
                <Link to="/ground-7-rule/signup">Register now!</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
