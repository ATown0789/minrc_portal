import React from "react";
import "./jobpostsuccess.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const JobPostSuccess = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      <div className="success-container">
        <h2>Your Job Posting Has Been Successfully Submited</h2>

        <Link
          className="return-btn"
          to={
            user.agency === "MINRC Job Portal Admin"
              ? "/super-home"
              : "/agency-home"
          }
        >
          Back to Dashboard
        </Link>
      </div>
    </>
  );
};

export default JobPostSuccess;
