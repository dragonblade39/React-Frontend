import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "../images/logo.png";
import axios from "axios";
import bg from "../images/bg.jpg"; // Make sure the path to the image is correct
import { Link } from "react-router-dom";
import "../styles/SignUp.module.css";
import { FormGroup } from "@mui/material";
function SignUp() {
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [password1, setPassword1] = useState();
  const [gender, setGender] = useState("Male");
  const [date, setDate] = useState();
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  let handleSubmit = (event) => {
    const bmi = (weight / ((height / 100) * (height / 100))).toFixed(2);
    console.log(bmi);
    const obj = {
      name,
      username,
      email,
      password,
      password1,
      gender,
      date,
      height,
      weight,
      bmi,
    };
    console.log(obj);
    // const url = "http://localhost:5500/signup/create-fitness";
    const url = "https://react-backend-production-62ec.up.railway.app/signup/create-fitness";
    axios
      .post(url, obj)
      .then((res) => {
        if (res.status === 200) {
          alert("User added successfully Go to login page to login");
          window.location.href = "/";
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          alert(err.response.data); // Display the response data from the server
        } else {
          alert("An error occurred: " + err.message);
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
      <div style={overlayStyle}></div>{" "}
      {/* Pseudo-element for background opacity */}
      <Navbar style={navbarStyle}>
        <Container>
          <Navbar.Brand href="sign-up" className="mx-auto bold" style={bold}>
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
              background: "linear-gradient(135deg,#47BDBF , #79ABB6)", // Gradient background
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              padding: "20px",
            }}
          >
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="formGroupName" style={formGroupStyle}>
                <Form.Label style={labelStyle} for="name">
                  Name
                </Form.Label>
                <Form.Control
                  type="text"
                  id="name"
                  placeholder="Enter Name"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please choose Name.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formGroupUsername" style={formGroupStyle}>
                <Form.Label for="username" style={labelStyle}>
                  Username
                </Form.Label>
                <Form.Control
                  type="text"
                  id="username"
                  placeholder="Enter Username"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a username.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formGroupEmail" style={formGroupStyle}>
                <Form.Label for="email" style={labelStyle}>
                  Email address
                </Form.Label>
                <Form.Control
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Form.Control.Feedback type="invalid">
                  Please choose a correct email.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formGroupPassword" style={formGroupStyle}>
                <Form.Label for="password" style={labelStyle}>
                  Password
                </Form.Label>
                <Form.Control
                  id="password"
                  type="password"
                  placeholder="Password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Form.Control.Feedback type="invalid">
                  Please choose a password.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                controlId="formGroupConfirmPassword"
                style={formGroupStyle}
              >
                <Form.Label for="password1" style={labelStyle}>
                  Confirm Password
                </Form.Label>
                <Form.Control
                  id="password1"
                  type="password"
                  placeholder="Confirm Password"
                  required
                  onChange={(e) => setPassword1(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please confirm password.
                </Form.Control.Feedback>
              </Form.Group>

              <FormGroup style={formGroupStyle}>
                <Form.Label for="gender" style={labelStyle}>
                  Gender
                </Form.Label>
                <Form.Select
                  style={{ formGroupStyle }}
                  required
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option
                    onSelect={(e) => setGender(e.target.value)}
                    value="Male"
                  >
                    Male
                  </option>
                  <option
                    onSelect={(e) => setGender(e.target.value)}
                    value="Female"
                  >
                    Female
                  </option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Please select your Gender.
                </Form.Control.Feedback>
              </FormGroup>
              <Form.Group controlId="formGroupheight" style={formGroupStyle}>
                <Form.Label for="height" style={labelStyle}>
                  Height
                </Form.Label>
                <Form.Control
                  id="height"
                  type="number"
                  required
                  placeholder="Height (in cms)"
                  onChange={(e) => setHeight(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your Height in numbers.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formGroupweight" style={formGroupStyle}>
                <Form.Label for="weight" style={labelStyle}>
                  Weight
                </Form.Label>
                <Form.Control
                  id="dob"
                  type="number"
                  placeholder="Weight (in kgs)"
                  required
                  onChange={(e) => setWeight(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your Weight in numbers.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formGroupDob" style={formGroupStyle}>
                <Form.Label for="password1" style={labelStyle}>
                  Date of Birth
                </Form.Label>
                <Form.Control
                  id="dob"
                  type="date"
                  required
                  onChange={(e) => setDate(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your Date of Birth.
                </Form.Control.Feedback>
              </Form.Group>

              <br />
              <Form.Group as={Row} className="mb-3 justify-content-center">
                {" "}
                {/* Added justify-content-center */}
                <Col sm={{ span: 10, offset: 8 }}>
                  <Button type="submit">Sign up</Button>
                </Col>
              </Form.Group>
              <Col style={{ marginLeft: "10%" }}>
                Already Have an Account? <Link to="/">Login</Link> here
              </Col>
            </Form>
          </Card>
        </Col>
      </Container>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default SignUp;
