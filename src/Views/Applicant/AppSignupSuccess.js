import React, { useEffect } from "react";
import "./appsignupsuccess.css";
import { Link } from "react-router-dom";
import { logout } from "firebase.config";

const AppSignupSuccess = () => {
  useEffect(() => {
    logout();
  }, []);
  return (
    <>
      <div className="success-container">
        <h2>You have successfully registered a new Applicant User</h2>

        <Link className="return-btn" to={"/"}>
          Return to Dashboard
        </Link>
      </div>
    </>
  );
};

export default AppSignupSuccess;
