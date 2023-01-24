import { Navbar, Nav, Container } from "react-bootstrap";
import { useGetTokenQuery } from "./store/authApi";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";

function Navbars(props) {
  const { data: token, isLoading: tokenLoading } = useGetTokenQuery();

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={require("./img/MainLogo.png")}
              alt=""
              width="35"
              height="35"
              className="d-inline-block align-top mr-2"
            />
            D&C
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link active aria-current="page" href="/">
                Home
              </Nav.Link> */}
            </Nav>
            <Nav className="me-auto">
              <Nav.Link active aria-current="page" href="/inventory">
                <img
                  src={require("./img/backpack.png")}
                  alt=""
                  width="35"
                  height="35"
                  className="d-inline-block align-top mr-2"
                />
                Inventory
              </Nav.Link>
              <Nav.Link active aria-current="page" href="/map">
                <img
                  src={require("./img/map.png")}
                  alt=""
                  width="35"
                  height="35"
                  className="d-inline-block align-top mr-2"
                />
                Map
              </Nav.Link>
              <Nav.Link active aria-current="page" href="/createCharacter">
                <img
                  src={require("./img/character.png")}
                  alt=""
                  width="35"
                  height="35"
                  className="d-inline-block align-top mr-2"
                />
                Character
              </Nav.Link>
              <Nav.Link active aria-current="page" href="/currency">
                <img
                  src={require("./img/currency2.png")}
                  alt=""
                  width="35"
                  height="35"
                  className="d-inline-block align-top mr-2"
                />
                Currency
              </Nav.Link>
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
