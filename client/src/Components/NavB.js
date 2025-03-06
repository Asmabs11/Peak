import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Nav from "react-bootstrap/Nav";
import { getAuth, logout } from "../Redux/actions";
import { useNavigate } from "react-router";
import peak from "../Images/Peak.jpg";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavB = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAuth());
  }, [dispatch]);

  const logoutUser = () => {
    dispatch(logout());
    navigate("/");
  };

  const user = useSelector((state) => state.user);
  const card = useSelector((state) => state.card) || [];

  // Calculate total cart items
  const totalItems = card.reduce((acc, item) => acc + (item?.quantity || 0), 0);

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <img src={peak} alt="Logo" className="website-logo" />

          <span className="website-name">
            P<span className="highlight">eak</span> P
            <span className="highlight">erform</span>
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown
              title="Categories"
              id="basic-nav-dropdown"
              className="navbar-dark"
            >
              <NavDropdown.Item as={Link} to="/category/men">
                Men
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/women">
                Women
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/kids">
                Kids
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/accessories">
                Accessories
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Nav className="ms-auto d-flex align-items-center">
            {user ? (
              <>
                <Nav.Link>
                  <button
                    onClick={logoutUser}
                    className="navbar-auth-btn"
                    aria-label="Logout"
                  >
                    Logout
                  </button>
                </Nav.Link>

                <Nav.Link className="user-name">
                  {user?.fullName}
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link>
                  <Link to="/login">
                    <button className="navbar-auth-btn">Login</button>
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/signup">
                    <button className="navbar-auth-btn">SignUp</button>
                  </Link>
                </Nav.Link>
              </>
            )}
            <Nav.Link
              as={Link}
              to="/card"
              className="cart-icon"
              style={{ fontWeight: "bold", color: "#ffcc00" }}
            >
              🛒 <span className="cart-count">{totalItems}</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavB;
