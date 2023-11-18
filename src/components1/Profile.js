import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import bg from "../images/bgafterlogin.jpg";
import logo from "../images/logo.png";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

function Profile() {
  const location = useLocation();
  const { username } = location.state || {};
  const obj1 = useParams();
  const [user, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

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

  const navbarStyle = {
    textAlign: "center",
  };

  const bold = {
    fontSize: "40px",
  };

  const cardContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
    paddingTop: "20px",
  };

  const cardStyle = {
    width: "80%", // Set the desired width
    maxWidth: "800px", // Set the maximum width
    margin: "0 auto", // Center the card horizontally
    boxShadow: " rgba(0, 0, 0, 0.35) 0px 5px 15px",
  };

  const cardBodyStyle = {
    background: "linear-gradient(135deg, #78D5CB , #E4EfE9)",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "20px",
  };

  useEffect(() => {
    // Make an API request to fetch user data and set the state variables
    const obj = { username };
    // const url = "http://localhost:5500/signup/profile";
    const url = `https://react-backend-cdll.onrender.com/signup/profile`;

    axios
      .post(url, obj)
      .then((res) => {
        if (res.status === 200) {
          const userData = res.data;
          setUsername(userData.username);
          setName(userData.name);
          setEmail(userData.email);
          setPassword(userData.password);
          setGender(userData.gender);
          setHeight(userData.height);
          setWeight(userData.weight);
          if (userData.date) {
            const dob = new Date(userData.date);
            const today = new Date();
            const ageDiff = today - dob;
            const ageDate = new Date(ageDiff);
            const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
            setAge(calculatedAge);
          }
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          alert(err.response.data);
        } else {
          alert("An error occurred: " + err.message);
        }
      })
      .finally(() => {
        setLoading(false); // Set loading to false whether the request was successful or not
      });
  }, []);

  let update = () => {
    navigate("/update", { state: { username } });
    return null;
  };
  let goback = () => {
    navigate("/dashboard");
    return null;
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
      <div style={cardContainerStyle}>
        <Card style={cardStyle}>
          <Card.Body style={cardBodyStyle}>
            <Form onSubmit={update}>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalEmail"
              >
                <Form.Label
                  column
                  sm={2}
                  style={{ fontWeight: "bold", fontSize: "large" }}
                >
                  Name
                </Form.Label>
                <Col sm={10}>
                  <Form.Control type="text" value={name} readOnly />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalUsername"
              >
                <Form.Label
                  column
                  sm={2}
                  style={{ fontWeight: "bold", fontSize: "large" }}
                >
                  Username
                </Form.Label>
                <Col sm={10}>
                  <Form.Control type="text" value={user} readOnly />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalName"
              >
                <Form.Label
                  column
                  sm={2}
                  style={{ fontWeight: "bold", fontSize: "large" }}
                >
                  Email
                </Form.Label>
                <Col sm={10}>
                  <Form.Control type="text" value={email} readOnly />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalName"
              >
                <Form.Label
                  column
                  sm={2}
                  style={{ fontWeight: "bold", fontSize: "large" }}
                >
                  Password
                </Form.Label>
                <Col sm={10}>
                  <Form.Control type="text" value={password} readOnly />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalGender"
              >
                <Form.Label
                  column
                  sm={2}
                  style={{ fontWeight: "bold", fontSize: "large" }}
                >
                  Gender
                </Form.Label>
                <Col sm={10}>
                  <Form.Control type="text" value={gender} readOnly />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalGender"
              >
                <Form.Label
                  column
                  sm={2}
                  style={{ fontWeight: "bold", fontSize: "large" }}
                >
                  Height
                </Form.Label>
                <Col sm={10}>
                  <Form.Control type="text" value={height} readOnly />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalGender"
              >
                <Form.Label
                  column
                  sm={2}
                  style={{ fontWeight: "bold", fontSize: "large" }}
                >
                  Weight
                </Form.Label>
                <Col sm={10}>
                  <Form.Control type="text" value={weight} readOnly />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalAge"
              >
                <Form.Label
                  column
                  sm={2}
                  style={{ fontWeight: "bold", fontSize: "large" }}
                >
                  Age
                </Form.Label>
                <Col sm={10}>
                  <Form.Control type="text" value={age} readOnly />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 2 }}>
                  <Button type="submit" className="me-5">
                    Update Profile
                  </Button>
                  <Button
                    type="submit"
                    className="ms-5"
                    to="/dashboard"
                    as={Link}
                    state={{ username }}
                  >
                    Go Back
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Profile;
