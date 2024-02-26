import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./agencyprofile.css";
import { useNavigate } from "react-router-dom";
import Button from "Components/Button";
import { setLoader } from "Redux/Loader/loaderSlice";
import Modal from "Components/Modal";

function AgencyProfile() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalToggle, setModalToggle] = useState(false);

  useEffect(() => {
    setTimeout(() => dispatch(setLoader(false)), 1000);
    if (!user.loggedIn) navigate("/");
  }, []);

  return (
    <>
      {modalToggle && (
        <Modal
          modalToggle={modalToggle}
          setModalToggle={setModalToggle}
          type={"resetPassword"}
          email={user.email}
        />
      )}
      <div className="tab-content">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>{user.agency}'s Profile</h1>
          <Button
            onClick={() => setModalToggle(true)}
            style={{ height: "40px", minWidth: "170px", marginRight: "5px" }}
            variant="delete primary"
          >
            Reset Password
          </Button>
        </div>
        <div className="inner-tab-content flex-column">
          <div className="profile-content">
            <h4>
              Created by: {user.fName} {user.lName}
            </h4>
            <h4>Agency located in: {user.stateSel}</h4>
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
    </>
  );
}

export default AgencyProfile;
