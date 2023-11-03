import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function Tasks() {
  const [workoutType, setWorkoutType] = useState("");
  const [selectedWorkoutType, setSelectedWorkoutType] = useState("");
  const [date, setDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");

  // Options for Type of workout based on the selected Workout Name
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to serialize the form data
    const formData = new FormData();
    formData.append("workoutName", workoutType);
    formData.append("workoutType", selectedWorkoutType);
    formData.append("date", date); // Add the date input field value
    formData.append("fromTime", fromTime);
    formData.append("toTime", toTime);
    const url = "";
    try {
      // Send a POST request to your backend endpoint
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Form data successfully submitted to the backend
        console.log("Form data submitted successfully");
        // You can redirect or handle the response here
      } else {
        // Handle the response if it's not okay
        console.error("Error submitting form data");
      }
    } catch (error) {
      // Handle any network or fetch errors
      console.error("Network error:", error);
    }
  };

  return (
    <div>
      <Card className="mx-auto" style={{ width: "600px" }}>
        <Card.Body>
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
                <Form.Control as="select" onChange={handleWorkoutNameChange}>
                  <option>Open this select menu</option>
                  <option value="Cardiovascular Workouts">
                    Cardiovascular Workouts
                  </option>
                  <option value="Strength Training">Strength Training</option>
                  <option value="Flexibility and Mobility">
                    Flexibility and Mobility
                  </option>
                  <option value="4">
                    High-Intensity Interval Training (HIIT)
                  </option>
                  <option value="Group Fitness Classes">
                    Group Fitness Classes
                  </option>
                  <option value="Outdoor Activities">Outdoor Activities</option>
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
              >
                <Form.Label column sm={4}>
                  Type of workout:
                </Form.Label>
                <Col sm={8}>
                  <Form.Control as="select" onChange={handleWorkoutTypeChange}>
                    <option value="">Select a Type of Workout</option>
                    {workoutTypeOptions[workoutType].map((option, index) => (
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
                      placeholder="City"
                      type="date"
                    />
                  </Col>
                  <Col xs={4}>
                    <Form.Control
                      onChange={handleFromTime}
                      placeholder="State"
                      type="time"
                    />
                  </Col>
                  <Col xs={4}>
                    <Form.Control
                      onChnage={handleToTime}
                      placeholder="Zip"
                      type="time"
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
                <Button type="submit">Submit</Button>
              </Col>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Tasks;
