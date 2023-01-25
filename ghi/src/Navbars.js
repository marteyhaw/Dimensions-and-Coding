import { Navbar, Nav, Container } from "react-bootstrap";
import { useGetTokenQuery } from "./store/authApi";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import { NavLink } from "react-router-dom";

function Navbars(props) {
  const { data: token, isLoading: tokenLoading } = useGetTokenQuery();

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <NavLink className="navbar-brand" to="/ground-7-rule/">
            <img
              src={require("./img/MainLogo.png")}
              alt=""
              width="80"
              height="80"
              className="d-inline-block align-top mr-2"
            />
          </NavLink>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link active aria-current="page" href="/">
                Home
              </Nav.Link> */}
            </Nav>
            <Nav className="me-auto">
              <NavLink className="navbar-brand" to="/ground-7-rule/inventory">
                {tokenLoading ? (
                  "Loading..."
                ) : token ? (
                  <div className="text-center text-warning">
                    <img
                      src={require("./img/backpack.png")}
                      alt=""
                      width="64"
                      height="64"
                      className="d-inline-block align-top border border-warning"
                    />
                    <div>INVENTORY</div>
                  </div>
                ) : (
                  ""
                )}
              </NavLink>
              <NavLink className="navbar-brand" to="/ground-7-rule/map">
                {tokenLoading ? (
                  "Loading..."
                ) : token ? (
                  <div className="text-center text-warning">
                    <img
                      src={require("./img/map.png")}
                      alt=""
                      width="64"
                      height="64"
                      className="d-inline-block align-top border border-warning"
                    />
                    <div>MAP</div>
                  </div>
                ) : (
                  ""
                )}
              </NavLink>
              <NavLink className="navbar-brand" to="/ground-7-rule/currency">
                {tokenLoading ? (
                  "Loading..."
                ) : token ? (
                  <div className="text-center text-warning">
                    <img
                      src={require("./img/currency2.png")}
                      alt=""
                      width="64"
                      height="64"
                      className="d-inline-block align-top border border-warning"
                    />
                    <div>CURRENCY</div>
                  </div>
                ) : (
                  ""
                )}
              </NavLink>
              <NavLink className="navbar-brand" to="/ground-7-rule/character">
                {tokenLoading ? (
                  "Loading..."
                ) : token ? (
                  <div className="text-center text-warning">
                    <img
                      src={require("./img/character.png")}
                      alt=""
                      width="64"
                      height="64"
                      className="d-inline-block align-top border border-warning"
                    />
                    <div>CHARACTER</div>
                  </div>
                ) : (
                  ""
                )}
              </NavLink>
            </Nav>
            <Nav>
              <div className="navbar-item">
                {tokenLoading ? (
                  "Loading..."
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
