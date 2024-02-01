import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./agencyprofile.css";
import { useNavigate } from "react-router-dom";

function AgencyProfile() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
    if (!user.loggedIn) navigate("/");
  }, []);

  return (
    <div className="tab-content">
      <h1>{user.agency}'s Profile</h1>
      <div className="profile-content">
        <h4>
          Created by {user.fName} {user.lName}
        </h4>
        <h4>Located in {user.stateSel}</h4>
        <h4>Contact email: {user.email}</h4>
      </div>
    </div>
  );
}

export default AgencyProfile;
