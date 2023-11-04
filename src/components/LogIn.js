import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "../images/logo.png";
import bg from "../images/bg.jpg";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import axios from "axios";

function LogIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loggedIn, setLoggedIn] = useState(false);

  let handleLogin = (event) => {
    const obj = { username, password };
    // const url = "http://localhost:5500/signup/login";
    const url = "https://react-backend-cdll.onrender.com/signup/login";
    axios
      .post(url, obj)
      .then((res) => {
        if (res.status === 200) {
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          alert(err.response.data);
        } else {
          alert(err.message);
        }
      });
    event.preventDefault();
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
    fontWeight: "bold", // Make the labels bolder
  };

  const formGroupStyle = {
    margin: "10px 0",
    paddingLeft: "10%",
    paddingRight: "10%",
  };

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
              Fitness Tracker
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
                    placeholder="Password"
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
