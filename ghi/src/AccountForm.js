import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSignUpMutation } from "./store/authApi";
import { updateField } from "./store/accountSlice";
import Notification from "./Notifications";
import { useNavigate } from "react-router-dom";

function AccountForm(props) {
  const dispatch = useDispatch();
  const { first_name, last_name, username, email, password } = useSelector(
    (state) => state.account
  );
  const [signUp, { error, isLoading: signUpLoading }] = useSignUpMutation();
  const field = useCallback(
    (e) =>
      dispatch(updateField({ field: e.target.name, value: e.target.value })),
    [dispatch]
  );
  const navigate = useNavigate();

  const attemptSubmit = async (e) => {
    e.preventDefault();
    const response = await signUp({
      first_name,
      last_name,
      username,
      email,
      password,
    });
    if (response.data) {
      navigate("/ground-7-rule/");
    }
  };

  return (
    <>
      <div className="sign-bg">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 text-white mt-4 text-white text-white">
              <p>
                "Welcome to the darkness, where fear and uncertainty reign. Are
                you brave enough to enter the abyss and face your deepest fears?
                Sign up now and enter a world of horror, where every step you
                take could be your last. Beware, once you enter, there may be no
                turning back."
              </p>
            </div>

            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 text-white mt-4 text-white ">
              Sign up
            </p>
            {error ? (
              <Notification type="danger">{error?.data?.detail}</Notification>
            ) : null}
            <form method="POST" onSubmit={(e) => attemptSubmit(e)}>
              <div className="d-flex flex-row align-items-center mb-4 ">
                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                <div className="form-outline flex-fill mb-0">
                  <label className="label" htmlFor="username">
                    First name
                  </label>
                  <div className="control">
                    <input
                      required
                      onChange={field}
                      value={first_name}
                      name="first_name"
                      id="first_name"
                      className="form-control"
                      type="text"
                      placeholder="First name"
                    />
                  </div>
                </div>
              </div>

              <div className="d-flex flex-row align-items-center mb-4 ">
                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                <div className="form-outline flex-fill mb-0">
                  <label className="label" htmlFor="username">
                    Last name
                  </label>
                  <div className="control">
                    <input
                      required
                      onChange={field}
                      value={last_name}
                      name="last_name"
                      id="last_name"
                      className="form-control"
                      type="text"
                      placeholder="Last name"
                    />
                  </div>
                </div>
              </div>

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
                      type="text"
                      placeholder="Username"
                    />
                  </div>
                </div>
              </div>

              <div className="d-flex flex-row align-items-center mb-4 ">
                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                <div className="form-outline flex-fill mb-0">
                  <label className="label" htmlFor="username">
                    Email
                  </label>
                  <div className="control">
                    <input
                      required
                      onChange={field}
                      value={email}
                      name="email"
                      id="email"
                      className="form-control"
                      type="email"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
              </div>

              <div className="d-flex flex-row align-items-center mb-4 ">
                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                <div className="form-outline flex-fill mb-0">
                  <label className="label" htmlFor="username">
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
                  disabled={signUpLoading}
                  className="btn btn-primary btn-lg"
                >
                  Sign up
                </button>
              </div>
            </form>

            <div className="dropdown-divider"></div>
            <div className="card">
              <div className="card-header">Quote</div>
              <div className="card-body">
                <blockquote className="blockquote mb-0">
                  <p>"The greatest adventure is what lies ahead."</p>
                  <footer className="blockquote-footer">J.R.R. Tolkien</footer>
                </blockquote>
              </div>
            </div>
            <div
              className="d-flex flex-column
            flex-md-row text-center
            text-md-start justify-content-between
            py-4 text-white px-4 text-white px-xl-5 bg-primary"
            >
              <div className="text-white mb-3 mb-md-0">
                Copyright © 2020. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountForm;
