
import { useState, useContext } from 'react'
import { NavLink } from "react-router-dom";
import PawImg from "../src/assets/paw-solid.svg"
import { Container, Nav, Navbar, Image } from 'react-bootstrap'

import "../CSS/NavComp.css"

//contexts
import { AuthContext } from '../contexts/authContext';
const NavComp = () => {

  const { hasToken, setHasToken, loggedUsername, setLoggedUsername, userId } = useContext(AuthContext)

  function Logout() {
    localStorage.removeItem("token")
    setHasToken("")
    setLoggedUsername("")
    // navigate("/")
  }

  console.log(hasToken)
  return (
    <>
      <Navbar className="" expand="lg">

        <Navbar.Brand href="/home" >
          {/* <NavLink className="d-flex "
            to={hasToken ? "/pets" : "/"}
            aria-label="bring to home page" > */}

                <Image className="me-3" src={PawImg} href="/"></Image>
              <span className="brand-name mt-3">PawPets</span>

          {/* </NavLink> */}
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <span>{loggedUsername}</span>
            <NavLink to="/pets"
              aria-label="bring to pet page">
              <span>Pets</span>
            </NavLink>
            {hasToken && (<NavLink to={`/dashboard/${userId}`}
              aria-label="bring to user pet page">
              <span>My Pets</span>
            </NavLink>)}
            {/* <NavLink to={`/dashboard/${userId}`}
              aria-label="bring to user pet page">
              <span>My Pets</span>
            </NavLink> */}
            {hasToken ?
              (<button onClick={Logout}> <NavLink to="/home" aria-label="bring to home page"> <span>Logout</span> </NavLink> </button>) :
              (<NavLink to="/login" aria-label="bring to login page"> <span>Login</span> </NavLink>)}
          </Nav>
        </Navbar.Collapse>
      </Navbar >

    </>
  )
}

export default NavComp