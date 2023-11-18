import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Spinner from "react-bootstrap/Spinner";
import logo from "../images/logo.png";
import axios from "axios";
import bg from "../images/bg.jpg";
import { Link, useNavigate } from "react-router-dom";
// import "../styles/LogIn.module.css";

function LogIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  let handleLogin = (event) => {
    event.preventDefault();

    setLoading(true); // Set loading to true when the form is submitted

    const obj = { username, password };
    // const url = "http://localhost:5500/signup/login";
    const url = "https://react-backend-cdll.onrender.com/signup/login";

    axios
      .post(url, obj)
      .then((res) => {
        setLoading(false); // Set loading to false when the request is completed

        if (res.status === 200) {
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        setLoading(false); // Set loading to false on error

        if (err.response && err.response.status === 400) {
          alert(err.response.data);
        } else {
          alert(err.message);
        }
      });
  };

  const navbarStyle = {
    textAlign: "center",
  };
  const bold = {
    fontSize: "40px",
  };

  const backgroundStyle = {
    backgroundRepeat: `no-repeat`,
    background: `url(${bg})`,
    backgroundSize: "100%",
    backgroundPosition: "center",
    minHeight: "100vh",
    position: "relative",
  };

  const overlayStyle = {
    content: "",
    display: "block",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  const labelStyle = {
    fontWeight: "bold",
  };

  const formGroupStyle = {
    margin: "10px 0",
    paddingLeft: "10%",
    paddingRight: "10%",
  };

  const loadingContainerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000, // Set a higher z-index to appear above other elements
  };

  const blurOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `url(${bg})`,
    backgroundSize: "100%", // Zoom out the background image
    filter: "blur(5px)", // Add blur effect
    zIndex: -1, // Behind the loading content
  };

  if (loading) {
    return (
      <div>
        <div style={blurOverlayStyle}></div>
        <div style={loadingContainerStyle}>
          <Spinner animation="border" role="status"></Spinner>
          <h1 className="sr-only">&nbsp;&nbsp;Loading...</h1>
        </div>
      </div>
    );
  }

  if (!loggedIn) {
    return (
      <div style={backgroundStyle}>
        <div style={overlayStyle}></div>
        <Navbar style={navbarStyle}>
          <Container>
            <Navbar.Brand href="sign-up" className="mx-auto" style={bold}>
              <img
                alt=""
                src={logo}
                width="100"
                height="100"
                className="d-inline-block align-top"
              />{" "}
              <span
                style={{
                  textShadow: "0px 0px 6px rgba(6,0,0,0.6)",
                }}
              >
                Fitness Tracker
              </span>
            </Navbar.Brand>
          </Container>
        </Navbar>
        <Container
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "80vh" }}
        >
          <Col md={6}>
            <Card
              style={{
                background: "linear-gradient(135deg,#47BDBF , #79ABB6)",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                boxShadow: " rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
            >
              <Form noValidate onSubmit={handleLogin}>
                <Form.Group
                  controlId="formGroupUsername"
                  style={formGroupStyle}
                >
                  <Form.Label style={labelStyle}>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Username"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your username.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  controlId="formGroupPassword"
                  style={formGroupStyle}
                >
                  <Form.Label style={labelStyle}>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your password.
                  </Form.Control.Feedback>
                </Form.Group>
                <br />
                <Form.Group as={Row} className="mb-3 justify-content-center">
                  <Col sm={{ span: 10, offset: 8 }}>
                    <Button type="submit">Sign in</Button>
                  </Col>
                </Form.Group>
                <Row className="mb-3">
                  <Col sm={6} style={{ marginLeft: "10%" }}>
                    Create a new Account? <Link to="/sign-up">Sign Up</Link>{" "}
                    here
                  </Col>
                  <Col sm={4} style={{ marginLeft: "auto" }}>
                    Forgot <Link to="/forgot-password">Password?</Link>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
        </Container>
      </div>
    );
  } else {
    navigate("/dashboard", { state: { username } });
    return null;
  }
}

export default LogIn;
