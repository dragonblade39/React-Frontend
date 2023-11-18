import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import bg from "../images/bgafterlogin.jpg";
import logo from "../images/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Home.module.css";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Card, CardColumns } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

function TasksHistory() {
  const [workoutType, setWorkoutType] = useState("");
  const [selectedWorkoutType, setSelectedWorkoutType] = useState("");
  const [date, setDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [data, setData] = useState([]);
  const [displayNewForm, setDisplayNewForm] = useState(false);
  const [cardToDeleteIndex, setCardToDeleteIndex] = useState(-1);
  const [calories, setCalories] = useState("");
  const [totalCalories, setTotalCalories] = useState("");
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  let username = location.state ? location.state.username : null;
  const [name, setName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [greeting, setGreeting] = useState("");
  const [bmi, setBmi] = useState();
  const [bmiReport, setBmiReport] = useState("");
  const [currentSchedule, setCurrentSchedule] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (username === null) {
      navigate("/");
    }
  }, [username]);

  useEffect(() => {
    // Fetch user history data from your backend
    const fetchData = async () => {
      try {
        // const response = await axios.get(
        //   `http://localhost:5500/history?username=${username}`
        // );
        const response = await axios
          .get(
            `https://react-backend-cdll.onrender.com/history?username=${username}`
          )
          .finally(() => {
            setLoading(false); // Set loading to false whether the request was successful or not
          });
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching history data:", error);
      }
    };

    if (username) {
      fetchData();
    }
  }, [username]);

  const backgroundStyle = {
    backgroundRepeat: "no-repeat",
    background: `url(${bg})`,
    backgroundSize: "100%",
    backgroundPosition: "center",
    minHeight: "100vh",
    position: "relative",
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
      <br />
      <center>
        <h1>
          <span style={{ fontWeight: "bold" }}>
            <span style={{ textShadow: "0px 0px 6px rgba(6,0,0,0.1)" }}>
              Username: &nbsp;
            </span>
          </span>
          <span style={{ color: "red" }}>{username}</span>
        </h1>
      </center>
      <br />
      <Container>
        {data.length === 0 ? (
          <h1>No Tasks found</h1>
        ) : (
          <Row>
            <h1>Tasks</h1>
            {data.map((record, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={4}>
                <Card
                  style={{
                    background: "linear-gradient(to left,#C9E9E5,#77D5CB)",
                    boxShadow: " rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    margin: "10px",
                  }}
                >
                  <Card.Body>
                    <div>
                      <center>
                        <Card.Title>Task {index + 1}</Card.Title>
                      </center>
                      <Card.Text>
                        <span style={{ fontWeight: "bold" }}>
                          Workout Type:
                        </span>{" "}
                        {record.workoutType}
                      </Card.Text>
                      <Card.Text>
                        <span style={{ fontWeight: "bold" }}>
                          Selected Workout Type:
                        </span>{" "}
                        {record.selectedWorkoutType}
                      </Card.Text>
                      <Card.Text>
                        <span style={{ fontWeight: "bold" }}>Date:</span>{" "}
                        {record.date.slice(0, 10)}
                      </Card.Text>
                      <Card.Text>
                        <span style={{ fontWeight: "bold" }}>From Time:</span>{" "}
                        {record.fromTime}
                      </Card.Text>
                      <Card.Text>
                        <span style={{ fontWeight: "bold" }}>To Time:</span>{" "}
                        {record.toTime}
                      </Card.Text>
                      <Card.Text>
                        <span style={{ fontWeight: "bold" }}>Calories:</span>{" "}
                        {record.calories}
                      </Card.Text>
                      <Card.Text>
                        <span style={{ fontWeight: "bold" }}>
                          Total Calories:
                        </span>{" "}
                        {record.totalCalories}
                      </Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default TasksHistory;
