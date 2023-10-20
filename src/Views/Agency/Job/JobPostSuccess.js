import React from "react";
import "./jobpostsuccess.css";
import { Link } from "react-router-dom";

const JobPostSuccess = () => {
  return (
    <>
      <div className="success-container">
        <h2>Your Job Posting Has Been Successfully Submited</h2>

        <Link className="return-btn" to={"/agency-home"}>
          Back to Dashboard
        </Link>
      </div>
    </>
  );
};

export default JobPostSuccess;
