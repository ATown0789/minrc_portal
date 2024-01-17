import React from "react";
import "./applysuccess.css";
import { Link } from "react-router-dom";

const ApplySuccess = () => {
  return (
    <>
      <div className="success-container">
        <h2>Thank you for your interest.</h2>
        <h3>We will be in touch with you shortly.</h3>
        <Link className="return-btn" to={"/applicant-home"}>
          Back to Job Board
        </Link>
      </div>
    </>
  );
};

export default ApplySuccess;
