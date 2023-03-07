import React from 'react'
import { Outlet } from 'react-router-dom'
import { Container, Nav, Navbar } from 'react-bootstrap'
import NavComp from '../components/NavComp'

import "../CSS/Main.css"
const Main = () => {
    return (
        <Container fluid>
            <header>
                <NavComp />
            </header>
            <Outlet />
            <footer className='layout'> Project done by Gracelyn, Jacky, Joselyn </footer>
        </Container>
    )
}

export default Main