import React from "react";
import { NavLink, redirect, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Col, Row, Container, Image, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

import "../CSS/Signup.css";
import { StyledButton, BlueHeader } from "../components/styled/Button";
import DogImage from "../src/images/dog-image.png";
const Signup = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function submitSignup(e) {
    e.preventDefault();
    console.log(username, password);
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:3001/auth/signup",
        data: {
          username: username,
          password: password,
        },
      });

      if (response) {
        toast.success("Successfully signed up!", {
          position: toast.POSITION.TOP_CENTER,
        });

        return navigate("/login");
      } else {
        throw Error("No response");
      }
    } catch (e) {
      toast.error(`Unable to log in. ${e.response.data.message}!`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }
  return (
    <Container fluid className="signup-container p-0 m-0">
      {/* <div>   </div> */}
      <Col
        className="sign-up-col d-flex flex-sm-column flex-lg-row mt-5 p-xs-3"
        xs={12}
        md={10}
        xl={9}
      >
        <Col>
          <Row>
            <Col>
              <BlueHeader className="signup-header">
                <span>A place to love your pets.</span>
                <span> Show them off today!</span>{" "}
              </BlueHeader>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col
              className="form-col"
              xs={7}
              sm={6}
              md={6}
              lg={8}
              xl={8}
              xxl={5}
            >
              <Form onSubmit={submitSignup}>
                <div className="mb-3">
                  <label htmlFor="inputUsername" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputUsername"
                    aria-describedby="username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="inputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </div>
                <StyledButton type="submit" className="btn btn-primary">
                  Sign Up
                </StyledButton>
              </Form>

              <div className="mt-3">
                <span className="me-2">Already have an account?</span>
                <NavLink to="/login">Log In!</NavLink>
              </div>
            </Col>
          </Row>
        </Col>
        <Col>
          <Image fluid src={DogImage} alt="" />
        </Col>
      </Col>
    </Container>
  );
};

export default Signup;
