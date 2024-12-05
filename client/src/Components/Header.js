import { Navbar, Nav, NavItem } from "reactstrap";
import logo from "../Components/Images/FocusMate-logo.jpg"; // تعديل المسار هنا
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Features/UserSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle logout action
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <Navbar className="header">
        <Nav>
          {/* Logo Section */}
          <NavItem>
            <Link to="/">
              <img src={logo} className="logo" alt="FocusMate Logo" />
            </Link>
          </NavItem>
          
          {/* Navigation Links */}
          <NavItem>
            <Link to="/">Home</Link>
          </NavItem>
          <NavItem>
            <Link to="/tasks">Tasks</Link>
          </NavItem>
          <NavItem>
            <Link to="/add-task">Add Task</Link>
          </NavItem>
          <NavItem>
            <Link to="/about">About</Link>
          </NavItem>

          {/* Logout Button */}
          <NavItem>
            <Link onClick={handleLogout}>Logout</Link>
          </NavItem>
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
