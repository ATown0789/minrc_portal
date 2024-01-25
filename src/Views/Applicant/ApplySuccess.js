import React from "react";
import "./applysuccess.css";
import { Link } from "react-router-dom";

const ApplySuccess = () => {
  return (
    <>
      <div className="tab-content">
        <div className="inner-tab-content">
          <h3 className="centered-text">Thank you for your interest.</h3>
          <p className="centered-text ">
            We will be in touch with you shortly.
          </p>
          <Link className="centered-text primary" to={"/applicant-home"}>
            Back to Job Board
          </Link>
        </div>
      </div>
    </>
  );
};

export default ApplySuccess;
