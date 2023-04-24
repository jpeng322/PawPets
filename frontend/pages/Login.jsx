import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/authContext";
import { toast } from "react-toastify";

//styling
import "../CSS/Login.css";
import { Col, Row, Container, Image, Form, Button } from "react-bootstrap";
import CatSelfie from "../src/images/cat-selfie.png";
import { StyledButton, BlueHeader } from "../components/styled/Button";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {
    hasToken,
    setHasToken,
    setLoggedUsername,
    loggedUsername,
    userId,
    setUserId,
    token,
    setToken,
  } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (hasToken) {
      navigate(`/dashboard/${userId}`);
    }
  }, [hasToken]);

  async function submitLogin(e) {
    e.preventDefault();
    console.log(username, password);
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:3001/auth/login",
        data: {
          username: username,
          password: password,
        },
      });

      if (response) {
        const data = await response.data;
        // console.log(data)
        localStorage.setItem("token", `${data.token}`);
        setToken(data.token);
        setHasToken("token");

        localStorage.setItem("username", data.username);
        setLoggedUsername(data.username);

        localStorage.setItem("userId", data.userId);
        setUserId(data.userId);
        // return <Navigate to="(`/dashboard/${data.userId}`" replace={true} />
        // navigate(`/dashboard/${data.userId}`)
        toast.success(`Welcome back ${data.username}!`, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        throw Error("No response");
      }
    } catch (e) {
      toast.error(`Unable to log in. ${e.response.data.message}!`, {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log(e.response.data);
      console.log("CAUGHTCAUGHTCAUGHT");
    }
  }
  return (
    <Container fluid className="login-container p-0 m-0">
      <Col
        className="login-col d-flex flex-sm-column flex-lg-row mt-5 p-xs-3"
        xs={12}
        md={10}
        xl={9}
      >
        <Row className="login-container-row d-flex flex-column flex-xl-row">
          <Col className="login-cotainer-col d-flex flex-column align-items-center ">
            <Col>
              <BlueHeader className="login-header text-center mb-3">
                {" "}
                Welcome Back to PawPets!
              </BlueHeader>
            </Col>
            <Col xs={7} sm={7} md={5} lg={5} xl={8} xxl={6}>
              <Form onSubmit={submitLogin}>
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
                  Login
                </StyledButton>
              </Form>
              <div className=" d-flex gap-2 mt-3 justify-content-center">
                <span className="">Dont have an account?</span>
                <NavLink to="/signup">Sign up!</NavLink>
              </div>
            </Col>
          </Col>
          <Col className="cat-col">
            <Image className="cat-selfie" fluid src={CatSelfie}></Image>
          </Col>
        </Row>
      </Col>
    </Container>
  );
};

export default Login;
