import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLogInMutation } from "./store/authApi";
import { updateField } from "./store/accountSlice";
import Notification from "./Notifications";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGetTokenQuery } from "./store/authApi";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useLazyGetCharactersListQuery } from "./store/charApi";

function LoginForm() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const { username, password } = useSelector((state) => state.account);
  const [logIn, { error, isLoading: logInLoading }] = useLogInMutation();
  const { data: token, refetch: refetchToken } = useGetTokenQuery();

  const [getCharactersList, { data: charList }] =
    useLazyGetCharactersListQuery();
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
      await refetchToken();
    }
    if (response.status === 500) {
      console.log(error);
      setShowModal(true);
    }
  };

  useEffect(() => {
    const afterSubmit = async () => {
      if (token) {
        await getCharactersList(token?.user.id);
      }
    };
    if (error?.status === "FETCH_ERROR") {
      setShowModal(true);
    }
    afterSubmit();
  }, [token, getCharactersList, error]);

  useEffect(() => {
    const afterTokenRefetching = async () => {
      if (charList) {
        let path;
        if (charList.length === 0) {
          path = "/ground-7-rule/createCharacter";
        } else {
          path = "/ground-7-rule/selectCharacter";
        }
        navigate(path);
      }
    };
    afterTokenRefetching();
  }, [charList, navigate]);

  return (
    <>
      {/* <div className="App">
        {username !== "" ? (
          <div className="welcome">
            <h2>
              {" "}
              Welcome, <span>(username)</span>
            </h2>
            <button>Dashboard</button>
          </div>
        ) : (
          <div>Please Login</div>
        )}
      </div> */}

      <div className="login-bg" style={{ position: "relative" }}>
        <img
          src={require("./img/Shah.png")}
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
              <p className="text-center h3">
                Slayer, welcome back to the Battlefield. Your kingdom awaits
                upon your arrival.
              </p>
            </div>
            <p
              className="text-center h1 fw-bold mx-1 mx-md-4 mt-0"
              style={{ marginBottom: "12rem" }}
            >
              Login
            </p>
            {error ? (
              <Notification type="danger">
                {error.status === "FETCH_ERROR"
                  ? "Login failed"
                  : "There was a problem logging in"}
              </Notification>
            ) : null}
            <form method="POST" onSubmit={(e) => attemptSubmit(e)}>
              <div className="d-flex flex-row align-items-center mb-4 ">
                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                <div className="form-outline flex-fill mb-0">
                  <label className="label fw-bold" htmlFor="username">
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
                      autoComplete="username"
                    />
                  </div>
                </div>
              </div>

              <div className="d-flex flex-row align-items-center mb-4 ">
                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                <div className="form-outline flex-fill mb-0">
                  <label className="label fw-bold" htmlFor="password">
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
                  disabled={logInLoading}
                  className="btn btn-primary btn-lg mb-3"
                >
                  Sign in
                </button>
              </div>
            </form>
            <Modal
              centered
              show={showModal}
              onHide={() => setShowModal(false)}
              contentClassName="py-3 bg-danger text-white fw-bold text-center"
            >
              There was a problem logging in.
              <br />
              Please try again in a few seconds.
            </Modal>
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
