import React from 'react'
import { NavLink } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import { Col, Row, Container, Image, Form, Button } from "react-bootstrap"


import "../CSS/Signup.css"

import DogImage from "../images/dog-image.png"
const Signup = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function submitSignup(e) {
        e.preventDefault()
        console.log(username, password)
        axios({
            method: 'post',
            url: "http://localhost:8080/auth/signup",
            data: {
                username: username,
                password: password
            }
        });
    }
    return (
        <Container className="signup-container">
            {/* <div>   </div> */}
            <Row>
                <Col>
                    <div className="signup-header"><span>A place to love your pets.</span><span> Show them off today!</span> </div>
                    <Form onSubmit={submitSignup}>
                        <div className="mb-3">
                            <label htmlFor="inputUsername" className="form-label">Username</label>
                            <input type="text" className="form-control" id="inputUsername" aria-describedby="username" onChange={(e) => setUsername(e.target.value)} value={username} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} value={password} />
                        </div>
                        <Button type="submit" className="btn btn-primary">Submit</Button>
                    </Form>
                    <div>
                        <span>Already have an account?</span>
                        <NavLink to="/signup">Log In!</NavLink>
                    </div>
                </Col>
                <Col>
                    <img src={DogImage} alt="" />
                </Col>
            </Row>
        </Container>
    )
}

export default Signup