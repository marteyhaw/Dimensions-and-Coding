import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSignUpMutation } from "./store/authApi";
import { updateField } from "./store/accountSlice";
import Notification from "./Notifications";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";

function AccountForm(props) {
  const [showModal, setShowModal] = useState(false);
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
      navigate("/ground-7-rule/createCharacter");
    }
    if (response.status === 500) {
      console.log(error);
      setShowModal(true);
    }
  };

  useEffect(() => {
    if (error?.status === "FETCH_ERROR") {
      setShowModal(true);
    }
  }, [error]);

  return (
    <>
      <div className="sign-bg" style={{ position: "relative" }}>
        <img
          src={require("./img/Andrew.png")}
          alt="login-bg"
          style={{
            display: "block",
            margin: "0 auto",
          }}
        />
        <div style={{ position: "absolute", left: 0, top: 0, width: "100%" }}>
          <div
            className="text-white"
            style={{
              textShadow: "#000 1px 0 20px",
              margin: "0 auto",
              width: "40%",
            }}
          >
            <div className="p-2 mt-4">
              <p className="text-center h5">
                "Welcome to the darkness, where fear and uncertainty reign. Are
                you brave enough to enter the abyss and face your deepest fears?
                Sign up now and enter a world of horror, where every step you
                take could be your last. Beware, once you enter, there may be no
                turning back."
              </p>
            </div>
            <p
              className="text-center h1 fw-bold mx-1 mx-md-4 text-white mt-4 text-white"
              style={{ marginBottom: "18rem" }}
            >
              Sign up
            </p>
            {error ? (
              <Notification type="danger">
                {error.status === "FETCH_ERROR"
                  ? "Signup failed. Please try again in a moment."
                  : "There was a problem signing up"}
              </Notification>
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
                      autoComplete="username"
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
                      autoComplete="current-password"
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
            <Modal
              centered
              show={showModal}
              onHide={() => setShowModal(false)}
              contentClassName="py-3 bg-danger text-white fw-bold text-center"
            >
              There was a problem signing up.
              <br />
              Please try again in a moment.
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountForm;
