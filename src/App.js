import React from "react";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import Login from "./components/LogIn";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import Home from "./components1/Home";
import Profile from "./components1/Profile";
import Update from "./components1/Update";
import TasksHistory from "./components1/TasksHistory";
function App() {
  return (
    <Box>
      {/* <Box className={`${styles["main-container"]}`}> */}
      <Box>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route exact path="/dashboard" element={<Home />} />
          <Route exact path="/update" element={<Update />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="*" element={<SignUp />} />
          <Route exact path="/taskshistory" element={<TasksHistory />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
