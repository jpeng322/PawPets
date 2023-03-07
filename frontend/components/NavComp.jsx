
import React from 'react'
import { NavLink } from "react-router-dom";
import PawImg from "../src/assets/paw-solid.svg"
import { Container, Nav, Navbar } from 'react-bootstrap'

import "../CSS/NavComp.css"
const NavComp = () => {
  return (
    <Navbar className="">
      <div>
        <NavLink
          to="/"
          aria-label="bring to home page" className="">
          <img src={PawImg} href="/"></img>
          <span>PawPets</span>
        </NavLink>
      </div>
      <div>
        <NavLink to="/login"
          aria-label="bring to login page">
          <span>Login</span>
        </NavLink>
      </div>
    </Navbar >
  )
}

export default NavComp