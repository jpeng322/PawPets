import React from 'react'
import { Form, NavLink, useNavigate } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/authContext';




//styling
import "../CSS/Login.css"
import { Col, Row, Container, Image, Form, Button } from "react-bootstrap"

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
        <Container>
            <Row>
                <Col> Welcome back to PawPets! </Col>
            <Col>
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
            </Col>
            <Col>
                    <span>Dont have an account?</span>
                    <NavLink to="/signup">Sign up</NavLink>
            </Col>
        </Row>
        </Container >
    )
}

export default Login