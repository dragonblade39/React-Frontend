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
import InputGroup from "react-bootstrap/InputGroup";
import { Card, CardColumns } from "react-bootstrap";
import Carousel1 from "./Carousel1";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap-icons/font/bootstrap-icons.css";

function Home() {
  const [workoutType, setWorkoutType] = useState("");
  const [selectedWorkoutType, setSelectedWorkoutType] = useState("");
  const [date, setDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [data, setData] = useState([]);
  const [displayNewForm, setDisplayNewForm] = useState(false);
  const [cardToDeleteIndex, setCardToDeleteIndex] = useState(-1);
  const [cardToEditIndex, setCardToEditIndex] = useState(-1);
  const [calories, setCalories] = useState("");
  let [calories1, setCalories1] = useState("");
  const [totalCalories, setTotalCalories] = useState("");
  const [cardToDeleteIndex1, setCardToDeleteIndex1] = useState(null);
  const [selectedValue, setSelectedValue] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedRecord, setEditedRecord] = useState({
    /* Initialize with default values */
  });
  const [isCardEditing, setIsCardEditing] = useState(false);

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
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState([
    // Your array of records goes here
  ]);

  useEffect(() => {
    if (username === null) {
      navigate("/");
    }
  }, [username]);

  useEffect(() => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    let greetingMessage = "";

    if (currentHour >= 5 && currentHour < 12) {
      greetingMessage = "Good morning";
    } else if (currentHour >= 12 && currentHour < 17) {
      greetingMessage = "Good afternoon";
    } else if (currentHour >= 17 && currentHour < 21) {
      greetingMessage = "Good evening";
    } else {
      greetingMessage = "Good night";
    }

    setGreeting(greetingMessage);
  }, []);

  useEffect(() => {
    const obj = { username };
    // const url = "http://localhost:5500/signup/homepage";
    const url = "https://react-backend-cdll.onrender.com/signup/homepage";
    axios
      .post(url, obj)
      .then((res) => {
        if (res.status === 200) {
          const userData = res.data;
          console.log("Fetched user data: ", userData);
          setName(userData.name);
          setHeight(userData.height);
          setWeight(userData.weight);
          setBmi(userData.bmi);
          setIsLoading(false); // Data has been fetched, set isLoading to false
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

  useEffect(() => {
    if (!isLoading) {
      // Calculate BMI and set BMI report
      let report = "";
      if (bmi < 18.5) {
        report = "You are underweight";
      } else if (bmi >= 18.5 && bmi < 24.9) {
        report = "You are in the healthy weight range";
      } else if (bmi >= 25 && bmi < 29.9) {
        report = "You are overweight";
      } else {
        report = "You are obese";
      }
      setBmiReport(report);
    }
  }, [isLoading, bmi]);

  useEffect(() => {
    function getScheduleBasedOnTime() {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();

      let schedule = "";

      if (currentHour >= 6 && currentHour < 9) {
        schedule =
          "• Waking up early to start your day with a fresh mind.\n" +
          "• Hydrate with a glass of water.\n" +
          "• Exercise: Engage in physical activity, such as jogging, yoga, or a workout routine.\n" +
          "• Breakfast (7:00 AM - 8:00 AM):\n" +
          "   Have a balanced breakfast that includes protein, whole grains, fruits, and vegetables.";
      } else if (currentHour >= 9 && currentHour < 12) {
        schedule =
          "• Work or study on your most important tasks when your focus is high.\n" +
          "• Take short breaks for stretching or walking.";
      } else if (currentHour >= 12 && currentHour < 13) {
        schedule =
          "• Eat a healthy lunch with a mix of lean protein, whole grains, and vegetables.";
      } else if (currentHour >= 13 && currentHour < 15) {
        schedule =
          "• Continue work or study. Focus on tasks that require less mental energy.\n" +
          "• Stay hydrated by drinking water throughout the afternoon.";
      } else if (currentHour >= 15 && currentHour < 16) {
        schedule =
          "• 10. Enjoy a small, healthy snack like fruit, yogurt, or nuts.";
      } else if (currentHour >= 16 && currentHour < 17) {
        schedule =
          "• Engage in a physical activity or go for a walk to boost your energy.";
      } else if (currentHour >= 17 && currentHour < 19) {
        schedule =
          "• Resume work or study if needed, or use this time for personal activities.\n" +
          "• Spend time with family or engage in hobbies.";
      } else if (currentHour >= 19 && currentHour < 20) {
        schedule =
          "• Have a light and early dinner with a good balance of nutrients.";
      } else if (currentHour >= 20 && currentHour < 21) {
        schedule =
          "• Wind down by reading, meditating, or practicing relaxation exercises.";
      } else if (currentHour >= 21) {
        schedule =
          "• Prepare for sleep by dimming lights and avoiding screens.";
      }

      return schedule;
    }

    const schedule = getScheduleBasedOnTime();
    setCurrentSchedule(schedule);
  }, []);

  const backgroundStyle = {
    backgroundRepeat: "no-repeat",
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
    position: "sticky", // Make the navbar sticky
    top: "0", // Stick to the top of the page
    zIndex: "100", // Add z-index to ensure it's above other elements
    background: "linear-gradient(to right , #DCF0ED,#C0E6E1)",
    //boxShadow: " rgba(0, 0, 0, 0.35) 0px 5px 15px",
  };

  const bold = {
    fontSize: "40px",
  };

  const bold1 = {
    fontSize: "30px",
    fontWeight: "500",
    color: "black",
    marginTop: "-40px",
    paddingRight: "20px",
  };

  const bold2 = {
    fontSize: "25px",
    fontWeight: "500",
    marginTop: "-40px",
    padding: "1px 6px",
    //marginBottom: "20px",
    marginRight: "-80px",
    background: "black",
  };

  const logout = () => {
    setLoading(true);
    username = "";
    setLoading(false);
    navigate("/");
  };
  const scrollToTop = () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  const workoutTypeOptions = {
    "Cardiovascular Workouts": [
      "Running",
      "Jogging",
      "Walking",
      "Cycling",
      "Swimming",
      "Rowing",
      "Jumping rope",
      "Aerobics",
      "Dancing",
    ],
    "Strength Training": [
      "Weightlifting",
      "Bodyweight exercises (e.g., push-ups, pull-ups)",
      "Resistance band workouts",
      "Kettlebell exercises",
    ],
    "Flexibility and Mobility": ["Yoga", "Pilates", "Stretching routines"],
    "High-Intensity Interval Training (HIIT)": [
      "Interval running",
      "Tabata workouts",
      "CrossFit",
      "Circuit training",
    ],
    "Group Fitness Classes": [
      "Spinning",
      "Zumba",
      "Barre",
      "Bootcamp",
      "Kickboxing",
    ],
    "Outdoor Activities": [
      "Hiking",
      "Trail running",
      "Rock climbing",
      "Mountain biking",
    ],
    "Sports and Recreational Activities": [
      "Tennis",
      "Soccer",
      "Basketball",
      "Golf",
      "Volleyball",
    ],
    "Martial Arts and Combat Sports": [
      "Boxing",
      "Muay Thai",
      "Brazilian Jiu-Jitsu",
      "Karate",
    ],
    "Specialized Workouts": [
      "CrossFit",
      "Bodybuilding",
      "Powerlifting",
      "Strongman",
      "Gymnastics",
    ],
    "Mind-Body Exercises": ["Tai Chi", "Qigong", "Meditation"],
    "Rehabilitation Exercises": [
      "Physical therapy exercises",
      "Post-injury or surgery rehab routines",
    ],
    "Functional Training": [
      "Functional movement exercises",
      "Balance and stability exercises",
    ],
    "Indoor and Home Workouts": [
      "Home workout routines",
      "Treadmill workouts",
      "Elliptical workouts",
      "Stationary bike workouts",
    ],
    "Water-Based Workouts": ["Water aerobics", "Aqua jogging", "Water polo"],
    "Winter Sports": ["Skiing", "Snowboarding", "Ice skating"],
    "Childhood Games and Activities": [
      "Tag",
      "Hide and seek",
      "Playground activities",
    ],
  };

  const handleWorkoutNameChange = (e) => {
    setWorkoutType(e.target.value);
    setSelectedWorkoutType(""); // Reset the selected workout type
  };

  // Handle the change in the Type of workout selection
  const handleWorkoutTypeChange = (e) => {
    setSelectedWorkoutType(e.target.value);
  };

  const handleDate = (e) => {
    setDate(e.target.value);
  };
  const handleFromTime = (e) => {
    setFromTime(e.target.value);
  };
  const handleToTime = (e) => {
    setToTime(e.target.value);
  };

  const handleFormSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    setLoading(true);

    // Create a FormData object to serialize the form data
    const obj = {
      username,
      workoutType,
      selectedWorkoutType,
      date,
      fromTime,
      toTime,
    };

    // Perform form validation
    if (!obj.username || obj.username.trim() === "") {
      alert("Username is required");
      return;
    }

    if (!obj.workoutType || obj.workoutType.trim() === "") {
      alert("Workout Type is required");
      return;
    }

    if (!obj.selectedWorkoutType || obj.selectedWorkoutType.trim() === "") {
      alert("Selected Workout Type is required");
      return;
    }

    if (!obj.date) {
      alert("Date is required");
      return;
    }

    if (!obj.fromTime) {
      alert("From Time is required");
      return;
    }

    if (!obj.toTime) {
      alert("To Time is required");
      return;
    }

    // const url = "http://localhost:5500/data/createTask";
    const url = "https://react-backend-cdll.onrender.com/data/createTask";
    await axios
      .post(url, obj)
      .then((res) => {
        if (res.status === 200) {
          console.log(obj);
          setLoading(false);
          window.location.reload();
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          alert(err.response.data);
        } else {
          alert(err.message);
        }
      });
    setLoading(false);
  };

  useEffect(() => {
    // Fetch user history data from your backend
    const fetchData = async () => {
      try {
        // const response = await axios.get(
        //   `http://localhost:5500/data?username=${username}`
        // );
        const response = await axios.get(
          `https://react-backend-cdll.onrender.com/data?username=${username}`
        );
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

  const handleDelete = (index) => {
    setLoading(true);
    const updatedRecords = [...records];
    updatedRecords.splice(index, 1);
    setRecords(updatedRecords);
    setDisplayNewForm(true); // Set to true to display the new form
    setCardToDeleteIndex(index);
    setLoading(false);
  };

  useEffect(() => {
    // Fetch user history data from your backend
    const fetchData = async () => {
      try {
        // const response = await axios.get(
        //   `http://localhost:5500/history/totalCalories?username=${username}`
        // );
        const response = await axios.get(
          `https://react-backend-cdll.onrender.com/history/totalCalories?username=${username}`
        );
        const totalCalories = response.data.totalCalories; // Assuming the total calories are in the 'totalCalories' field of the response
        setTotalCalories(totalCalories);
        console.log("Hello" + totalCalories);
      } catch (error) {
        console.error("Error fetching history data:", error);
      }
    };

    fetchData();
  }, [username]);

  const cardColors = {
    value1: "Primary",
    value2: "Secondary",
    value3: "Danger",
    value4: "Warning",
    value5: "Info",
    value6: "Light",
    value7: "Dark",
    value8: "Success",
    value9: "Primary",
    value10: "Secondary",
    value11: "Danger",
    value12: "Warning",
    value13: "Info",
    value14: "Light",
    value15: "Success",
    value16: "Success",
  };

  const updateCalories = async (index, record) => {
    setLoading(true);
    const weight1 = Number(weight);
    const caloriesValue = Number(calories1);

    if (!isNaN(weight) && !isNaN(caloriesValue)) {
      // Calculate calories1 with the given formula
      const updatedCalories1 = ((3.65 * 3.5 * weight) / 200) * caloriesValue;

      // Ensure that updatedCalories1 is a number
      if (!isNaN(updatedCalories1)) {
        setCalories1(updatedCalories1);

        const cal = Number(updatedCalories1);
        let cal1 = Number(totalCalories);
        const tt = totalCalories + updatedCalories1; // Update the total calories without calories1
        setTotalCalories(tt);
        console.log("Calories: " + totalCalories);
        const obj = {
          username,
          workoutType: record.workoutType,
          selectedWorkoutType: record.selectedWorkoutType,
          date: record.date,
          fromTime: record.fromTime,
          toTime: record.toTime,
          calories: updatedCalories1, // Include the updated calories value here
          totalCalories: tt,
        };
        console.log(record);
        // const url = "http://localhost:5500/history/create";
        const url = "https://react-backend-cdll.onrender.com/history/create";

        try {
          const response = axios.post(url, obj);

          if (response.status === 200) {
            console.log(obj);
            // Optionally, you can reset the calories state after a successful submission
            setCalories("");
            window.location.reload();
          }
        } catch (err) {
          if (err.response && err.response.status === 400) {
            alert(err.response.data);
            setLoading(false);
          } else {
            alert(err.message);
            setLoading(false);
          }
        }
      } else {
        alert("Calories calculation resulted in NaN.");
        setLoading(false);
      }
    } else {
      alert("Invalid weight or calories value. Ensure they are valid numbers.");
      setLoading(false);
    }

    // const url2 = `http://localhost:5500/data/deleteTask/${username}/${record.selectedWorkoutType}`;
    // const url = `https://reactbackend-mhmh.onrender.com/signup/update/${username}`;
    try {
      const deleteResponse = await axios.delete(
        "https://react-backend-cdll.onrender.com/data/deleteTask",
        {
          data: {
            username: username,
            selectedWorkoutType: record.selectedWorkoutType,
          },
        }
      );

      if (deleteResponse.status === 200) {
        window.location.reload();
        // Handle success
      } else if (deleteResponse.status === 404) {
        alert("Task not found");
      } else {
        alert("Failed to delete Task");
      }
    } catch (err) {
      alert("An error occurred while deleting the user: " + err.message);
    }
    setLoading(false);
    window.location.reload();
  };
  const handleDelete1 = async (index, record) => {
    setLoading(true);
    const obj = {
      username,
      workoutType: record.workoutType,
      selectedWorkoutType: record.selectedWorkoutType,
      date: record.date,
      fromTime: record.fromTime,
      toTime: record.toTime,
    };
    // const url2 = `http://localhost:5500/data/deleteTask/${username}/${record.selectedWorkoutType}`;
    // const url = `https://reactbackend-mhmh.onrender.com/signup/update/${username}`;
    console.log(record);

    try {
      const response = await axios.delete(
        "https://react-backend-cdll.onrender.com/data/deleteTask",
        {
          data: {
            username: username,
            selectedWorkoutType: record.selectedWorkoutType,
          },
        }
      );

      if (response.status === 200) {
        // Handle success if needed
      } else if (response.status === 404) {
        alert("Task not found");
      } else {
        alert("Failed to delete Task");
      }
    } catch (err) {
      alert("An error occurred while deleting the user: " + err.message);
    }
    setLoading(false);
    window.location.reload();
  };

  const handleUpdate = (index, record, event) => {
    setLoading(true);
    setIsEdit(true);
    setEditingIndex(index);
    setEditedRecord({ ...record });
    axios
      // .post(`http://localhost:5500/data/updateTask/`, editedRecord)
      .post(
        `https://react-backend-cdll.onrender.com/data/updateTask/`,
        editedRecord
      )

      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        // Handle errors (e.g., display an error message to the user)
        console.error("Update failed", error);
      });
    setLoading(false);
  };

  const handleEditWorkoutTypeChange = (e) => {
    // Update the 'editedRecord' state with the new workout type value.
    setEditedRecord({ ...editedRecord, workoutType: e.target.value });
  };

  const handleEditWorkoutSpecChange = (e) => {
    setEditedRecord({ ...editedRecord, selectedWorkoutType: e.target.value });
  };

  const handledate = (e) => {
    setEditedRecord({ ...editedRecord, date: e.target.value });
  };

  const handlefromTime = (e) => {
    setEditedRecord({ ...editedRecord, fromTime: e.target.value });
  };

  const handletotime = (e) => {
    setEditedRecord({ ...editedRecord, toTime: e.target.value });
  };

  const handleEditClick = (index) => {
    setIsCardEditing(true);
    setCardToEditIndex(index);
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
      <style>
        {`
          .background-container {
            filter: blur(6px);
            background-color: rgba(255, 255, 255, 0.7); /* Adjust the background color and opacity as needed */
          }
        `}
      </style>
      <Navbar style={navbarStyle}>
        <Container>
          <Navbar.Brand href="" className="mx-auto" style={bold}>
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
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link
                style={{
                  ...bold1,
                  borderRight: "2px solid black",
                  textShadow: "0px 0px 6px rgba(1,0,0,0.3)",
                }}
                as={Link}
                to="/dashboard"
                state={{ username }}
                onClick={scrollToTop}
              >
                <i className="bi bi-house-fill"></i>
                &nbsp;Home
              </Nav.Link>
              <Nav.Link
                style={{
                  ...bold1,
                  borderRight: "2px solid black",
                  textShadow: "0px 0px 6px rgba(1,0,0,0.3)",
                }}
                as={Link}
                to="/taskshistory"
                state={{ username }}
              >
                <i className="bi bi-hourglass-split"></i>
                &nbsp;Tasks History
              </Nav.Link>
              <Nav.Link
                style={{
                  ...bold1,
                  borderRight: "2px solid black",
                  textShadow: "0px 0px 6px rgba(1,0,0,0.3)",
                }}
                href="/profile"
                as={Link}
                to="/profile"
                state={{ username }}
              >
                <i className="bi bi-person-circle"></i>
                &nbsp;Profile
              </Nav.Link>
              <Nav.Link
                style={{
                  ...bold1,
                  borderRight: "2px solid black",
                  textShadow: "0px 0px 6px rgba(1,0,0,0.3)",
                }}
                as={Link}
                to="/update"
                state={{ username }}
              >
                <i className="bi bi-person-lines-fill"></i>
                &nbsp;Update
              </Nav.Link>
              <span style={{ marginRight: "15px" }}></span>
              <Button
                onClick={logout}
                style={{
                  ...bold2,
                  textShadow: "0px 0px 6px rgba(250,250,250,0.9)",
                }}
              >
                <i className="bi bi-door-open-fill"></i>
                &nbsp; Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <h1
        className="animated-text"
        style={{ marginLeft: "10%", marginTop: "2%" }}
      >
        Hello <span style={{ color: "red" }}>{name}</span>,
      </h1>
      <h1
        className="animated-text"
        style={{ marginLeft: "15%", marginTop: "2%" }}
      >
        {greeting}.
      </h1>
      <br />
      <br />
      <h1 style={{ marginLeft: "10%", marginTop: "2%" }}>
        Total Calories Burnt{" "}
        <span style={{ color: "red" }}>{totalCalories}</span>
      </h1>

      <br />
      <br />
      <h1 style={{ marginLeft: "10%", marginTop: "2%" }}>
        Your Bmi is <span style={{ color: "red" }}>{bmi}</span>,
      </h1>
      <h1 style={{ marginLeft: "15%", marginTop: "2%", fontSize: "30px" }}>
        {bmiReport}.
      </h1>
      <h1
        style={{
          marginLeft: "15%",
          marginTop: "2%",
          fontSize: "30px",
          whiteSpace: "pre-line",
        }}
      >
        {currentSchedule}
      </h1>
      <br />
      <br />
      {calories1}
      <div>
        <Card
          className="mx-auto"
          style={{
            width: "600px",
            background: "linear-gradient(to left,#C9E9E5,#77D5CB)",
            boxShadow: " rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        >
          <Card.Body>
            <InputGroup hasValidation>
              <Form onSubmit={handleFormSubmit}>
                <center>
                  <h1>Add Task</h1>
                </center>
                <br />
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalEmail"
                >
                  <Form.Label column sm={4}>
                    Workout Name:
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      as="select"
                      onChange={handleWorkoutNameChange}
                      required
                    >
                      <option>Open this select menu</option>
                      <option value="Cardiovascular Workouts">
                        Cardiovascular Workouts
                      </option>
                      <option value="Strength Training">
                        Strength Training
                      </option>
                      <option value="Flexibility and Mobility">
                        Flexibility and Mobility
                      </option>
                      <option value="4">
                        High-Intensity Interval Training (HIIT)
                      </option>
                      <option value="Group Fitness Classes">
                        Group Fitness Classes
                      </option>
                      <option value="Outdoor Activities">
                        Outdoor Activities
                      </option>
                      <option value="Sports and Recreational Activities">
                        Sports and Recreational Activities
                      </option>
                      <option value="Martial Arts and Combat Sports">
                        Martial Arts and Combat Sports
                      </option>
                      <option value="Specialized Workouts">
                        Specialized Workouts
                      </option>
                      <option value="Mind-Body Exercises">
                        Mind-Body Exercises
                      </option>
                      <option value="Rehabilitation Exercises">
                        Rehabilitation Exercises
                      </option>
                      <option value="Functional Training">
                        Functional Training
                      </option>
                      <option value="Indoor and Home Workouts">
                        Indoor and Home Workouts
                      </option>
                      <option value="Water-Based Workouts">
                        Water-Based Workouts
                      </option>
                      <option value="Winter Sports">Winter Sports</option>
                      <option value="Childhood Games and Activities">
                        Childhood Games and Activities
                      </option>
                    </Form.Control>
                  </Col>
                  <Form.Control.Feedback type="invalid">
                    Please choose a Workout name.
                  </Form.Control.Feedback>
                </Form.Group>

                {workoutType && (
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formHorizontalPassword"
                    style={{
                      background: "linear-gradient(to left,#C9E9E5,#77D5CB)",
                    }}
                  >
                    <Form.Label column sm={4}>
                      Type of workout:
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Control
                        as="select"
                        onChange={handleWorkoutTypeChange}
                        required
                      >
                        <option value="">Select a Type of Workout</option>
                        {workoutTypeOptions[workoutType].map(
                          (option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          )
                        )}
                      </Form.Control>
                    </Col>
                    <Form.Control.Feedback type="invalid">
                      Please choose a type of workout.
                    </Form.Control.Feedback>
                  </Form.Group>
                )}

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalEmail"
                >
                  <Form.Label column sm={4}>
                    Date and Time:
                  </Form.Label>
                  <Col sm={8}>
                    <Row>
                      <Col xs={4}>
                        <Form.Control
                          onChange={handleDate}
                          type="date"
                          required
                        />
                      </Col>
                      <Col xs={4}>
                        <Form.Control
                          onChange={handleFromTime}
                          type="time" // Change type to text
                          required
                        />
                      </Col>
                      <Col xs={4}>
                        <Form.Control
                          onChange={handleToTime}
                          type="time" // Change type to text
                          required
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Form.Control.Feedback type="invalid">
                    Please choose a Date and Time.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Col sm={{ span: 8, offset: 4 }}>
                    <Button type="submit" onClick={handleFormSubmit}>
                      Submit
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            </InputGroup>
          </Card.Body>
        </Card>
      </div>
      <br />
      <br />
      <Container>
        {data.length === 0 ? (
          <h1>No Tasks added</h1>
        ) : (
          <Row>
            <h1>Tasks</h1>
            {data.map((record, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={4}>
                <Card
                  className={`${
                    isCardEditing && index === cardToEditIndex
                      ? "card-highlight"
                      : ""
                  }`}
                  style={{
                    margin: "10px",
                    background: "linear-gradient(to left,#C9E9E5,#77D5CB)",
                    boxShadow: " rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  }}
                >
                  <Card.Body>
                    <div>
                      {index === cardToDeleteIndex ? (
                        index === cardToEditIndex ? (
                          <h1>Edit Form</h1>
                        ) : (
                          /* New Form */
                          <div>
                            <Form>
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
                                <span style={{ fontWeight: "bold" }}>
                                  Date:
                                </span>{" "}
                                {record.date.slice(0, 10)}
                              </Card.Text>
                              <Card.Text>
                                <span style={{ fontWeight: "bold" }}>
                                  From Time:
                                </span>{" "}
                                {record.fromTime}
                              </Card.Text>
                              <Card.Text>
                                <span style={{ fontWeight: "bold" }}>
                                  To Time:
                                </span>{" "}
                                {record.toTime}
                              </Card.Text>
                              <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="formHorizontalEmail"
                              >
                                <Form.Label
                                  column
                                  sm={6}
                                  style={{ fontWeight: "bold" }}
                                >
                                  Workout Duration
                                </Form.Label>
                                <Col sm={12}>
                                  <Form.Control
                                    type="number"
                                    placeholder="Enter Workout Duration in mins"
                                    onChange={(e) =>
                                      setCalories1(e.target.value)
                                    }
                                  />
                                </Col>
                              </Form.Group>
                              <center>
                                <Button
                                  variant="success"
                                  onClick={() => updateCalories(index, record)}
                                >
                                  Done
                                </Button>
                              </center>
                            </Form>
                          </div>
                        )
                      ) : (
                        /* Task Form */
                        <div>
                          {isEdit && index === editingIndex ? (
                            // Edit form
                            <Form
                              onSubmit={handleUpdate}
                              className="card-highlight"
                            >
                              <Form.Group>
                                <Form.Label style={{ fontWeight: "bold" }}>
                                  Workout Type
                                </Form.Label>
                                <Form.Control
                                  value={editedRecord.workoutType}
                                  onChange={handleEditWorkoutTypeChange}
                                  as="select"
                                  required
                                >
                                  <option>Open this select menu</option>
                                  <option value="Cardiovascular Workouts">
                                    Cardiovascular Workouts
                                  </option>
                                  <option value="Strength Training">
                                    Strength Training
                                  </option>
                                  <option value="Flexibility and Mobility">
                                    Flexibility and Mobility
                                  </option>
                                  <option value="4">
                                    High-Intensity Interval Training (HIIT)
                                  </option>
                                  <option value="Group Fitness Classes">
                                    Group Fitness Classes
                                  </option>
                                  <option value="Outdoor Activities">
                                    Outdoor Activities
                                  </option>
                                  <option value="Sports and Recreational Activities">
                                    Sports and Recreational Activities
                                  </option>
                                  <option value="Martial Arts and Combat Sports">
                                    Martial Arts and Combat Sports
                                  </option>
                                  <option value="Specialized Workouts">
                                    Specialized Workouts
                                  </option>
                                  <option value="Mind-Body Exercises">
                                    Mind-Body Exercises
                                  </option>
                                  <option value="Rehabilitation Exercises">
                                    Rehabilitation Exercises
                                  </option>
                                  <option value="Functional Training">
                                    Functional Training
                                  </option>
                                  <option value="Indoor and Home Workouts">
                                    Indoor and Home Workouts
                                  </option>
                                  <option value="Water-Based Workouts">
                                    Water-Based Workouts
                                  </option>
                                  <option value="Winter Sports">
                                    Winter Sports
                                  </option>
                                  <option value="Childhood Games and Activities">
                                    Childhood Games and Activities
                                  </option>
                                </Form.Control>
                              </Form.Group>
                              <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="formHorizontalPassword"
                              >
                                <Form.Label
                                  column
                                  sm={6}
                                  style={{ fontWeight: "bold" }}
                                >
                                  Type of workout:
                                </Form.Label>
                                <Col sm={12}>
                                  <Form.Control
                                    as="select"
                                    value={editedRecord.selectedWorkoutType}
                                    onChange={handleEditWorkoutSpecChange}
                                    required
                                  >
                                    <option value="">
                                      Select a Type of Workout
                                    </option>
                                    {workoutTypeOptions[
                                      editedRecord.workoutType
                                    ].map((option, index) => (
                                      <option key={index} value={option}>
                                        {option}
                                      </option>
                                    ))}
                                  </Form.Control>
                                </Col>
                                <Form.Control.Feedback type="invalid">
                                  Please choose a type of workout.
                                </Form.Control.Feedback>
                              </Form.Group>
                              <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="formHorizontalEmail"
                              >
                                <Form.Label
                                  column
                                  sm={6}
                                  style={{ fontWeight: "bold" }}
                                >
                                  Date and Time:
                                </Form.Label>
                                <Col sm={15}>
                                  <Row>
                                    <Col xs={4}>
                                      <Form.Control
                                        type="date"
                                        required
                                        value={editedRecord.date}
                                        onChange={handledate}
                                      />
                                    </Col>
                                    <Col xs={4}>
                                      <Form.Control
                                        value={editedRecord.fromTime}
                                        onChange={handlefromTime}
                                        type="time" // Change type to text
                                        required
                                      />
                                    </Col>
                                    <Col xs={4}>
                                      <Form.Control
                                        value={editedRecord.toTime}
                                        onChange={handletotime}
                                        type="time" // Change type to text
                                        required
                                      />
                                    </Col>
                                  </Row>
                                </Col>
                                <Form.Control.Feedback type="invalid">
                                  Please choose a Date and Time.
                                </Form.Control.Feedback>
                              </Form.Group>
                              <br />
                              <Form.Group as={Row} className="mb-3">
                                <Col sm={{ span: 8, offset: 4 }}>
                                  <Button type="submit" onClick={handleUpdate}>
                                    Submit
                                  </Button>
                                </Col>
                              </Form.Group>
                            </Form>
                          ) : (
                            // Display task details
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
                                <span style={{ fontWeight: "bold" }}>
                                  Date:
                                </span>{" "}
                                {record.date.slice(0, 10)}
                              </Card.Text>
                              <Card.Text>
                                <span style={{ fontWeight: "bold" }}>
                                  From Time:
                                </span>{" "}
                                {record.fromTime}
                              </Card.Text>
                              <Card.Text>
                                <span style={{ fontWeight: "bold" }}>
                                  To Time:
                                </span>{" "}
                                {record.toTime}
                              </Card.Text>
                              <Button
                                variant="success"
                                onClick={() => handleDelete(index)}
                                style={{ marginLeft: "70px" }}
                              >
                                Done
                              </Button>
                              <Button
                                variant="warning"
                                onClick={() => handleUpdate(index, record)}
                                className="ms-2"
                              >
                                Edit
                              </Button>
                              <Button
                                variant="danger"
                                onClick={() => handleDelete1(index, record)}
                                className="ms-2"
                              >
                                Delete
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </Card.Body>
                </Card>
                {index < data.length - 1 && (
                  <hr style={{ margin: "10px 0", borderColor: "lightgray" }} />
                )}
              </Col>
            ))}
          </Row>
        )}
      </Container>
      <br />
      <br />
      <br />
      <div class="abc">
        <Carousel1 />
      </div>
      <br />

      <br />
    </div>
  );
}

export default Home;
