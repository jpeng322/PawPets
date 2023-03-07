
import { useState, useContext } from 'react'
import {  NavLink } from "react-router-dom";
import PawImg from "../src/assets/paw-solid.svg"
import { Container, Nav, Navbar } from 'react-bootstrap'

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
    <Navbar className="">
      <div>
        <NavLink
          to= {hasToken? "/pets": "/"}
          aria-label="bring to home page" className="">
          <img src={PawImg} href="/"></img>
          <span>PawPets</span>
        </NavLink>
      </div>

      <div>
        <span>{loggedUsername}</span>
        <NavLink to="/pets"
          aria-label="bring to pet page">
          <span>Pets</span>
        </NavLink>
        <NavLink to={`/dashboard/${userId}`}
          aria-label="bring to user pet page">
          <span>My Pets</span>
        </NavLink>
        {hasToken ?
          (<button onClick={Logout}> <NavLink to="/home" aria-label="bring to home page"> <span>Logout</span> </NavLink> </button>) :
          (<NavLink to="/login" aria-label="bring to login page"> <span>Login</span> </NavLink>)}
      </div>
    </Navbar >
  )
}

export default NavComp