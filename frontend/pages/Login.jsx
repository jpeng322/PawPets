import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/authContext';




//styling
import "../CSS/Login.css"
import { Col, Row, Container, Image, Form, Button } from "react-bootstrap"
import CatSelfie from "../images/cat-selfie.png"

const Login = () => {



    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    const { hasToken, setHasToken, setLoggedUsername, loggedUsername, userId, setUserId, token, setToken } = useContext(AuthContext)

    const navigate = useNavigate()
    useEffect(() => {
        if (hasToken) {
            // fake.logout();
            navigate(`/dashboard/${userId}`);
        }
    }, [hasToken]);

    async function submitLogin(e) {
        e.preventDefault()
        console.log(username, password)
        try {
            const response = await axios({
                method: 'post',
                url: "http://localhost:3001/auth/login",
                data: {
                    username: username,
                    password: password
                }
            })

            if (response) {
                const data = await response.data
                // console.log(data)
                localStorage.setItem("token", `${data.token}`)
                setToken(data.token)
                setHasToken("token")
                setLoggedUsername(data.username)
                setUserId(data.userId)
                // return <Navigate to="(`/dashboard/${data.userId}`" replace={true} />
                // navigate(`/dashboard/${data.userId}`)
            } else {
                throw Error("No response")
            }
        } catch (e) {
            console.log(e)
        };
    }
    return (
        <Container fluid className="login-container p-0 m-0">

            <Col className="login-col d-flex flex-sm-column flex-lg-row mt-5 p-xs-3" xs={12} md={10} xl={9} >
                <Row className="login-container-row d-flex flex-column flex-xl-row">
                    <Col className="login-cotainer-col d-flex flex-column align-items-center " >
                        <Col>
                            <div className="login-header text-center mb-3"> Welcome Back to PawPets!</div>
                        </Col>
                        <Col xs={7} sm={7} md={5} lg={5} xl={8} xxl={6}>
                            <Form onSubmit={submitLogin}>
                                <div className="mb-3">
                                    <label htmlFor="inputUsername" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="inputUsername" aria-describedby="username" onChange={(e) => setUsername(e.target.value)} value={username} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="inputPassword1" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} value={password} />
                                </div>

                                <Button type="submit" className="btn btn-primary">Login</Button>


                            </Form>
                            <div className=" d-flex gap-2 mt-3 justify-content-center" >
                                <div className="">Dont have an account?</div>
                                <div><NavLink to="/signup">Sign up!</NavLink></div>
                            </div>
                        </Col>
                    </Col>
                    <Col className="cat-col" ><Image className='cat-selfie' fluid src={CatSelfie}></Image></Col>

                </Row>
            </Col>
        </Container >

    )
}

export default Login