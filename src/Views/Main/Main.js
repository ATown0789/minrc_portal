import Login from "Components/Login";
import React, { useEffect } from "react";
import "./main.css";

const Main = () => {
  return (
    <div className="main-container">
      <div className="title-container">
        <h1>MINRC Job Portal</h1>
        <p>Welcome to the MINRC Job Portal.</p>
      </div>

      <div className="login-container">
        <Login loginType="applicant" />
        <Login loginType="agency" />
      </div>
    </div>
  );
};

export default Main;
