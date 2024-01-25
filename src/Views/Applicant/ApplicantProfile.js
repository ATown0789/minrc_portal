import { setLoader } from "Redux/Loader/loaderSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ApplicantProfile() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(user);

  useEffect(() => {
    if (!user.loggedIn) navigate("/");
  }, []);

  useEffect(() => {
    // window.scrollTo({ top: 0, behavior: "instant" });
    setTimeout(() => dispatch(setLoader(false)), 1000);
  }, []);

  return user.loggedIn ? (
    <div className="tab-content">
      <h1>{user.fName}'s Profile</h1>
      <div className="inner-tab-content flex-column">
        <h4>
          Name: {user.fName} {user.lName}
        </h4>
        <h4>Email: {user.email}</h4>
        <h4>Location: {user.stateSel}</h4>
        <h4>MINRC Cohort Year: {user.minrcYear}</h4>
        <h4>Completed Level of Shool: {user.education}</h4>
        <h4> Interests:</h4>
        <ul>
          {user.interests.map((interests, index) => {
            return <li key={index}>{interests.label}</li>;
          })}
        </ul>
        <h4> Skills:</h4>
        <ul>
          {user.skills.map((skills, index) => {
            return <li key={index}>{skills.label}</li>;
          })}
        </ul>
        <h4>Profesional Summary</h4>
        {user.summary.map((summary, index) => {
          return <p key={index}>{summary}</p>;
        })}
        <button
          onClick={() => navigate("/edit-profile")}
          className="primary secondary edit-btn"
        >
          Edit
        </button>
      </div>
    </div>
  ) : (
    <>
      <h2>You must log in to view this page</h2>
    </>
  );
}

export default ApplicantProfile;
