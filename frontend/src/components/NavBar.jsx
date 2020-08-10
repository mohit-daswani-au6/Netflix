import React, { useState } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import { NavLink, withRouter } from "react-router-dom";
const NavBar = ({ user, logoutUser,history }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = async () => {
    await logoutUser();
    history.push("/")
  };
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand to="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {!user ? (
              <>
                <NavItem>
                  <NavLink to="/user/register">Register</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/user/login">Login</NavLink>
                </NavItem>
              </>
            ) : null}
            {user ? (
              <NavItem>
                <NavLink to="/user/login" onClick={handleLogout}>
                  Logout
                </NavLink>
              </NavItem>
            ) : null}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText>Simple Text</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};
export default connect(mapStateToProps, { logoutUser })(withRouter(NavBar));
