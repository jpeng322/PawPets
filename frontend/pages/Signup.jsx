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
            url: "http://localhost:3001/auth/signup",
            data: {
                username: username,
                password: password
            }
        });
    }
    return (
        <Container fluid className="signup-container p-0 m-0">
            {/* <div>   </div> */}
            <Col className="sign-up-col d-flex flex-sm-column flex-lg-row mt-5 p-xs-3" xs={12} md={10} xl={9} >
                <Col  >
                    <Row>
                        <Col>
                            <div className="signup-header"><span>A place to love your pets.</span><span> Show them off today!</span> </div>
                        </Col>
                    </Row>
                    <Row className="d-flex justify-content-center align-items-center">
                        <Col className="form-col" xs={7} sm={6} md={6} lg={8} xl={8} xxl={5}>
                            <Form onSubmit={submitSignup}>
                                <div className="mb-3">
                                    <label htmlFor="inputUsername" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="inputUsername" aria-describedby="username" onChange={(e) => setUsername(e.target.value)} value={username} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="inputPassword1" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} value={password} />
                                </div>
                                <Button type="submit" className="btn btn-primary">Sign Up</Button>
                            </Form>

                            <div className="mt-3">
                                <span className="me-2">Already have an account?</span><NavLink to="/signup">Log In!</NavLink>
                            </div>
                        </Col>
                    </Row>


                </Col >
                <Col>
                    <Image fluid src={DogImage} alt="" />
                </Col>
            </Col>
        </Container >
    )
}

export default Signup