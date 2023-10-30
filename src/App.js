import React from "react";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import Login from "./components/LogIn";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
function App() {
  return (
    <Box>
      {/* <Box className={`${styles["main-container"]}`}> */}
      <Box>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route exact path="*" element={<SignUp />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
