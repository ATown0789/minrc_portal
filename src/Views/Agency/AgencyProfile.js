import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./agencyprofile.css";
import { useNavigate } from "react-router-dom";
import Button from "Components/Button";
import { setLoader } from "Redux/Loader/loaderSlice";

function AgencyProfile() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => dispatch(setLoader(false)), 1000);
    if (!user.loggedIn) navigate("/");
  }, []);

  return (
    <div className="tab-content">
      <div className="inner-tab-content flex-column">
        <h1>{user.agency}'s Profile</h1>
        <div className="profile-content">
          <h4>
            Created by {user.fName} {user.lName}
          </h4>
          <h4>Located in {user.stateSel}</h4>
          <h4>Contact email: {user.email}</h4>
        </div>
        <Button
          onClick={() => navigate("/edit-agency-profile")}
          className="primary secondary edit-btn"
        >
          Edit
        </Button>
      </div>
    </div>
  );
}

export default AgencyProfile;
