import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { Redirect } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

class Navbara extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
  }


  LogOut = (event) => {
    let options = {
      headers: {
        Authorization: this.state.UserToken,
      },
    };
    axios.get(this.state.domainLogout, options).then((response) => {
      localStorage.removeItem("userIsAuthToken");
      this.props.history.push("/");
    });
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { isOpen } = this.state;

    return (
      
      <div>
        <Navbar color="dark" light expand="sm">
          <NavbarBrand href="/menu">
            <img
              id="imagen"
              src="https://i.ibb.co/Fh6D0FN/wasd.png"
              width="auto"
              height="50"
              className="d-inline-block align-top"
              alt="Logo rentacar"
              style={{ marginLeft: "10px" }}
            />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />

          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/menu" style={{ color: "white", marginTop:"15px" }}>
                  Inicio
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/user" style={{ color: "white", marginTop:"15px" }}>
                  Mi Usuario
                </NavLink>
              </NavItem>
              <NavItem className="ml-auto">
                <NavLink href="/logout" style={{ color: "white", marginTop:"15px"  }}>
                  Cerrar Sesión
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Navbara;
