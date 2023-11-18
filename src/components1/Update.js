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
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

function Update() {
  const location = useLocation();
  let username = location.state ? location.state.username : null;
  const [user, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();
  const [bmi, setBmi] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (username === null) {
      navigate("/");
    }
  }, [username]);

  const handleUpdate = () => {
    // Calculate BMI based on updated height and weight
    const newBmi = (weight / ((height / 100) * (height / 100))).toFixed(2);
    console.log(newBmi);
    setIsUpdating(true);
    setLoading(true);

    if (newBmi == undefined) setBmi(newBmi);

    let updatedData = {
      username: user,
      name,
      email,
      password,
      gender,
      date: new Date(age),
      height,
      weight,
      bmi: newBmi, // Use the calculated BMI from newBmi
    };
    if (bmi == undefined) {
      setBmi(newBmi);
      updatedData = {
        username: user,
        name,
        email,
        password,
        gender,
        date: new Date(age),
        height,
        weight,
        bmi: newBmi, // Use the calculated BMI from newBmi
      };
    }
    console.log(updatedData);
    // const url = "http://localhost:5500/signup/update"; // Update the URL
    const url = "https://react-backend-cdll.onrender.com/signup/update";
    axios
      .post(url, updatedData)
      .then((res) => {
        setIsUpdating(false);
        if (res.status === 200) {
          setLoading(false);
          alert("Profile updated successfully");
        } else {
          alert("Profile update failed");
        }
      })
      .catch((err) => {
        setIsUpdating(false);
        alert("An error occurred while updating the profile: " + err.message);
      });
  };

  const delete1 = () => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete your profile?"
    );

    if (shouldDelete) {
      setLoading(true);
      // The user confirmed the deletion
      // const url = `http://localhost:5500/signup/update/${username}`;
      const url = `https://react-backend-cdll.onrender.com/signup/update/${username}`;
      axios
        .delete(url)
        .then((res) => {
          if (res.status === 200) {
            setLoading(false);
            alert("User deleted successfully");
            navigate("/signup");
          } else if (res.status === 404) {
            alert("User not found");
          } else {
            alert("Failed to delete user");
          }
        })
        .catch((err) => {
          alert("An error occurred while deleting the user: " + err.message);
        });

      // const url2 = `http://localhost:5500/data/deleteTask/${username}/${record.selectedWorkoutType}`;
      // const url = `https://reactbackend-mhmh.onrender.com/signup/update/${username}`;
      axios
        // .delete("http://localhost:5500/data/deleteTasks", {
        .delete("https://react-backend-cdll.onrender.com/data/deleteTasks", {
          data: {
            username: username,
          },
        })
        .then((res) => {
          if (res.status === 200) {
          } else if (res.status === 404) {
            alert("Task not found");
          } else {
            alert("Failed to delete Task");
          }
        })
        .catch((err) => {
          alert("An error occurred while deleting the user: " + err.message);
        });

      axios
        // .delete("http://localhost:5500/history/deleteTasks1", {
        .delete(
          "https://react-backend-cdll.onrender.com/history/deleteTasks1",
          {
            data: {
              username: username,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
          } else if (res.status === 404) {
            alert("Task not found");
          } else {
            alert("Failed to delete Task");
          }
        })
        .catch((err) => {
          alert("An error occurred while deleting the user: " + err.message);
        });
    } else {
      // The user canceled the deletion
      // You can add any rollback logic here if needed
    }
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
    borderRadius: "10px",
  };

  const cardStyle = {
    width: "80%", // Set the desired width
    maxWidth: "800px", // Set the maximum width
    margin: "0 auto", // Center the card horizontally
    borderRadius: "10px",
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
    const url = "https://react-backend-cdll.onrender.com/signup/profile";
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
          setAge(userData.date);
          setHeight(userData.height);
          setWeight(userData.weight);
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
  }, [username]); // Add username as a dependency to the useEffect

  let goback = () => {
    navigate("/profile");
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
            <Form>
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
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Col>
                <Form.Control.Feedback type="invalid">
                  Please choose Name.
                </Form.Control.Feedback>
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
                  <Form.Control
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
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
                  <Form.Control
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
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
                  <Form.Select
                    required
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Form.Select>
                </Col>
                <Form.Control.Feedback type="invalid">
                  Please select your Gender.
                </Form.Control.Feedback>
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
                  <Form.Control
                    type="text"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </Col>
                <Form.Control.Feedback type="invalid">
                  Please enter your height in cms.
                </Form.Control.Feedback>
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
                  <Form.Control
                    type="text"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </Col>
                <Form.Control.Feedback type="invalid">
                  Please enter your Weight in kgs.
                </Form.Control.Feedback>
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
                  DOB
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="date"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 2 }}>
                  <Button
                    type="button"
                    onClick={handleUpdate}
                    disabled={isUpdating}
                    className="me-3"
                  >
                    {isUpdating ? "Updating..." : "Done"}
                  </Button>
                  <Button
                    type="button"
                    onClick={delete1}
                    disabled={isUpdating}
                    className="ms-3 me-3"
                  >
                    {isUpdating ? "Deleting..." : "Delete Profile"}
                  </Button>
                  <Button
                    type="submit"
                    className="ms-3"
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

export default Update;
