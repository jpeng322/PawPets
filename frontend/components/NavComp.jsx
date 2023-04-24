import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import PawImg from "../src/assets/paw-solid.svg";
import PawImg2 from "../images/pawprint.png";
import { Container, Nav, Navbar, Image, Button } from "react-bootstrap";

import "../CSS/NavComp.css";
import { toast } from "react-toastify";
//contexts
import { AuthContext } from "../contexts/authContext";
const NavComp = () => {
  const {
    hasToken,
    setHasToken,
    loggedUsername,
    setLoggedUsername,
    userId,
    setUserId,
  } = useContext(AuthContext);
  function Logout() {
    localStorage.removeItem("token");
    setHasToken("");
    localStorage.removeItem("username");
    setLoggedUsername("");
    localStorage.removeItem("userId");
    setUserId("");
    toast.success("You have logged out!", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
  return (
    <>
      <Navbar className="" expand="lg">
        <Navbar.Brand href="/">
          {/* <NavLink className="d-flex "
            to={hasToken ? "/pets" : "/"}
            aria-label="bring to home page" > */}

          <Image className="me-1" src={PawImg2} href="/"></Image>
          <span className="brand-name mt-3">PawPets</span>

          {/* </NavLink> */}
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <span>{loggedUsername}</span>
            <NavLink to="/pets" aria-label="bring to pet page">
              <span>Pets</span>
            </NavLink>
            {hasToken && (
              <NavLink
                to={`/dashboard/${userId}`}
                aria-label="bring to user pet page"
              >
                <span>My Pets</span>
              </NavLink>
            )}
            {hasToken ?
              <NavLink to={`/favorites/${userId}`}
                aria-label="bring to user favorites page">
                <span>Favorites</span>
              </NavLink> : ""}
            {hasToken ? (
              <Button size="lg" variant="outline-secondary" onClick={Logout}>
                
                <NavLink to="/" aria-label="bring to home page">
                  
                  <span>Logout</span>
                </NavLink>

              </Button>
            ) : (
              <NavLink to="/login" aria-label="bring to login page">

                <span>Login</span>
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavComp;
