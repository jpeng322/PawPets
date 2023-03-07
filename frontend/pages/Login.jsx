import React from 'react'
import { Form, NavLink, useNavigate } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/authContext';

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
        <>
            <div> Welcome back to PawPets! </div>
            <form onSubmit={submitLogin}>
                <div className="mb-3">
                    <label htmlFor="inputUsername" className="form-label">Username</label>
                    <input type="text" className="form-control" id="inputUsername" aria-describedby="username" onChange={(e) => setUsername(e.target.value)} value={username} />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} value={password} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div>
                <span>Dont have an account?</span>
                <NavLink to="/signup">Sign up</NavLink>
            </div>
        </>
    )
}

export default Login