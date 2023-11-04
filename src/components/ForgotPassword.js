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
import axios from "axios";
function ForgotPassword() {
  const [username, setUsername] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();

  let handleSubmit = (event) => {
    const obj = { name, username, password };
    // const url = "http://localhost:5500/signup/forgot-password";
    const url =
      "https://react-backend-cdll.onrender.com/signup/forgot-password";
    axios
      .post(url, obj)
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        alert(err);
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
    backgroundSize: "100%", // Zoom out the background image
    backgroundPosition: "center",
    minHeight: "100vh", // Set the background to cover the full height
    position: "relative", // Position relative for pseudo-element
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
    margin: "10px 0", // Custom margin for Form.Group elements
    paddingLeft: "10%",
    paddingRight: "10%",
  };

  const [validated, setValidated] = useState(false);

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
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group controlId="formGroupUsername" style={formGroupStyle}>
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
              <Form.Group controlId="formGroupName" style={formGroupStyle}>
                <Form.Label style={labelStyle}>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your Name.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formGroupPassword" style={formGroupStyle}>
                <Form.Label style={labelStyle}>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new Password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your New Password.
                </Form.Control.Feedback>
              </Form.Group>
              <br />
              <Form.Group as={Row} className="mb-3 justify-content-center">
                <Col sm={{ span: 10, offset: 8 }}>
                  <Button type="submit">Sign in</Button>
                </Col>
              </Form.Group>
            </Form>
          </Card>
        </Col>
      </Container>
    </div>
  );
}

export default ForgotPassword;
