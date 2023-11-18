import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Spinner from "react-bootstrap/Spinner"; // Import Spinner for loading animation
import axios from "axios";
import logo from "../images/logo.png";
import bg from "../images/bg.jpg";

function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // New state for loading
  const [validated, setValidated] = useState(false);

  let handleSubmit = (event) => {
    const obj = { name, username, password };
    const url =
      "https://react-backend-cdll.onrender.com/signup/forgot-password";

    setLoading(true); // Set loading to true when the form is submitted

    axios
      .post(url, obj)
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setLoading(false); // Set loading to false when the request is completed
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
    fontWeight: "bold",
  };

  const formGroupStyle = {
    margin: "10px 0",
    paddingLeft: "10%",
    paddingRight: "10%",
  };

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
            <span style={{ textShadow: "0px 0px 6px rgba(6,0,0,0.6)" }}>
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
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : (
            <Card
              style={{
                background: "linear-gradient(135deg,#47BDBF , #79ABB6)",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                boxShadow: " rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
            >
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
                <Form.Group
                  controlId="formGroupPassword"
                  style={formGroupStyle}
                >
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
          )}
        </Col>
      </Container>
    </div>
  );
}

export default ForgotPassword;
