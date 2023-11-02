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
function Home() {
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
    const url = "https://reactbackend-mhmh.onrender.com/signup/homepage";
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
        setIsLoading(false); // Error occurred, set isLoading to false
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
  };

  const bold = {
    fontSize: "40px",
  };

  const bold1 = {
    fontSize: "30px",
    fontWeight: "500",
    color: "black",
    marginTop: "-40px",
    paddingRight: "30px",
  };

  const bold2 = {
    fontSize: "20px",
    fontWeight: "500",
    marginTop: "-40px",
  };

  const logout = () => {
    username = "";
    navigate("/");
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
            Fitness Tracker
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link
                style={bold1}
                as={Link}
                to="/dashboard"
                state={{ username }}
              >
                Home
              </Nav.Link>
              <Nav.Link
                href="/profile"
                style={bold1}
                as={Link}
                to="/profile"
                state={{ username }}
              >
                Profile
              </Nav.Link>
              <Nav.Link
                style={bold1}
                as={Link}
                to="/update"
                state={{ username }}
              >
                Edit Info
              </Nav.Link>
              <Button onClick={logout} style={bold2}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <h1
        className="animated-text"
        style={{ marginLeft: "10%", marginTop: "2%" }}
      >
        Hello, <span style={{ color: "red" }}>{name}</span>
      </h1>
      <h1
        className="animated-text"
        style={{ marginLeft: "15%", marginTop: "2%" }}
      >
        {greeting}.
      </h1>
      <br />
      <br />
      <br />
      <br />
      <div class="abc">
        <Carousel
          data-bs-theme="dark"
          style={{ marginLeft: "20%", marginRight: "20%" }}
        >
          <Carousel.Item>
            <div
              style={{
                marginLeft: "25%",
                marginRight: "25%",
                marginBottom: "0%",
                borderRadius: "10px",
              }}
            >
              <img
                className="d-block w-100 img1"
                src="https://www.drugwatch.com/wp-content/uploads/Heart-Health-Risk-Factors-640x0-c-default.jpg"
                alt="First slide"
                width="350px"
                height="400px"
                style={{ borderRadius: "10px" }}
              />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div
              style={{
                marginLeft: "25%",
                marginRight: "25%",
                marginBottom: "0%",
                borderRadius: "10px",
              }}
            >
              <img
                className="d-block w-100 img1"
                src="https://www.movemequotes.com/wp-content/uploads/2016/08/img_2910.jpg"
                alt="Second slide"
                width="400px"
                height="400px"
                style={{ borderRadius: "10px" }}
              />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div
              div
              style={{
                marginLeft: "25%",
                marginRight: "25%",
                marginBottom: "0%",
                borderRadius: "10px",
              }}
            >
              <img
                className="d-block w-100 img1"
                src="https://media1.popsugar-assets.com/files/thumbor/2f3aIvlmpAas3Qm1xth3HofnRs4=/fit-in/1456x1454/top/filters:format_auto():quality(85):upscale()/2018/03/20/623/n/1922729/77f6c34c5ab11348e08469.41551635_.jpg"
                alt="Third slide"
                width="400px"
                height="400px"
                style={{ borderRadius: "10px" }}
              />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div
              div
              style={{
                marginLeft: "25%",
                marginRight: "25%",
                marginBottom: "0%",
                borderRadius: "10px",
              }}
            >
              <img
                className="d-block w-100 img1"
                src="https://ellenvora.com/wp-content/uploads/2019/11/Instagram.png"
                alt="Third slide"
                width="400px"
                height="400px"
                style={{ borderRadius: "10px" }}
              />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div
              div
              style={{
                marginLeft: "25%",
                marginRight: "25%",
                marginBottom: "0%",
                borderRadius: "10px",
              }}
            >
              <img
                className="d-block w-100 img1"
                src="https://static1.squarespace.com/static/5c69cd6d34c4e25b25ac49fd/5c6d6f8524a694e2f1db76e6/5d23640b363b210001bc8355/1562600663271/40c2031a85e5a77e3fb2fd3e506c3c99.jpg?format=1500w"
                alt="Third slide"
                width="400px"
                height="400px"
                style={{ borderRadius: "10px" }}
              />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div
              div
              style={{
                marginLeft: "25%",
                marginRight: "25%",
                marginBottom: "0%",
                borderRadius: "10px",
              }}
            >
              <img
                className="d-block w-100 img1"
                src="https://i.pinimg.com/736x/c8/8f/06/c88f065145f8e3445af1262819ee46d2.jpg"
                alt="Third slide"
                width="400px"
                height="400px"
                style={{ borderRadius: "10px" }}
              />
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
      <br />
      <br />
      <h1 style={{ marginLeft: "10%", marginTop: "2%" }}>
        Your Bmi is <span style={{ color: "red" }}>{bmi}</span>,
      </h1>
      <h1 style={{ marginLeft: "15%", marginTop: "2%", fontSize: "30px" }}>
        {bmiReport}.
      </h1>
      <br />
      <h1 style={{ marginLeft: "10%", marginTop: "2%" }}>
        Present Your task is to
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
    </div>
  );
}

export default Home;
