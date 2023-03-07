import React from 'react'
import { Form, NavLink } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';

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
        <>
            {/* <div>   </div> */}
            <div>A place to love your pets. Show them off today! </div>
            <form onSubmit={submitSignup}>
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
                <span>Already have an account?</span>
                <NavLink to="/signup">Log In!</NavLink>
            </div>
        </>
    )
}

export default Signup