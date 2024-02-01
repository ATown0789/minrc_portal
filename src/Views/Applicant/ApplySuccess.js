import React, { useEffect } from "react";
import "./applysuccess.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ApplySuccess = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
    if (!user.loggedIn) navigate("/");
  }, []);

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
