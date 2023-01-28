import { Navbar, Nav, Container } from "react-bootstrap";
import { useGetTokenQuery } from "./store/authApi";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import { NavLink } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

function Navbars(props) {
  const { data: token, isLoading: tokenLoading } = useGetTokenQuery();

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <NavLink
            className="navbar-brand text-center text-warning"
            to="/ground-7-rule/"
          >
            <img
              src={require("./img/newlogo.png")}
              alt=""
              style={{ maxHeight: "80px" }}
              className="d-inline-block align-top mr-2"
            />
            <div>HOME</div>
          </NavLink>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <NavLink className="navbar-brand" to="/ground-7-rule/campground">
              {tokenLoading ? (
                <CircularProgress color="warning" />
              ) : token ? (
                <div className="text-center text-warning">
                  <img
                    src={require("./img/newcampfire.png")}
                    alt=""
                    style={{ maxHeight: "64px" }}
                    className="d-inline-block align-top "
                  />
                  <div>CAMPGROUND</div>
                </div>
              ) : (
                ""
              )}
            </NavLink>
            <Nav className="me-auto">
              <NavLink
                className="navbar-brand"
                to="/ground-7-rule/characterDetails"
              >
                {tokenLoading ? (
                  <CircularProgress color="warning" />
                ) : token ? (
                  <div className="text-center text-warning">
                    <img
                      src={require("./img/newshop.png")}
                      alt=""
                      style={{ maxHeight: "64px" }}
                      className="d-inline-block align-top"
                    />
                    <div>INVENTORY</div>
                  </div>
                ) : (
                  ""
                )}
              </NavLink>
              <NavLink className="navbar-brand" to="/ground-7-rule/map">
                {tokenLoading ? (
                  <CircularProgress color="warning" />
                ) : token ? (
                  <div className="text-center text-warning">
                    <img
                      src={require("./img/newmap.png")}
                      alt=""
                      style={{ maxHeight: "64px" }}
                      className="d-inline-block align-top b"
                    />
                    <div>MAP</div>
                  </div>
                ) : (
                  ""
                )}
              </NavLink>
              <NavLink className="navbar-brand" to="/ground-7-rule/shop">
                {tokenLoading ? (
                  <CircularProgress color="warning" />
                ) : token ? (
                  <div className="text-center text-warning">
                    <img
                      src={require("./img/newcurrency.png")}
                      alt=""
                      style={{ maxHeight: "64px" }}
                      className="d-inline-block align-top "
                    />
                    <div>SHOP</div>
                  </div>
                ) : (
                  ""
                )}
              </NavLink>
              <NavLink
                className="navbar-brand"
                to="/ground-7-rule/selectCharacter"
              >
                {tokenLoading ? (
                  <CircularProgress color="warning" />
                ) : token ? (
                  <div className="text-center text-warning">
                    <img
                      src={require("./img/newcharacter.png")}
                      alt=""
                      style={{ maxHeight: "64px" }}
                      className="d-inline-block align-top "
                    />
                    <div style={{ fontSize: "17px" }}>CHARACTER</div>
                  </div>
                ) : (
                  ""
                )}
              </NavLink>
            </Nav>
            <Nav>
              <div className="navbar-item">
                {tokenLoading ? (
                  <CircularProgress color="warning" />
                ) : token ? (
                  <LogoutButton />
                ) : (
                  <LoginButton />
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
export default Navbars;
