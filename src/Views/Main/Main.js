import Login from "Views/Login/Login";
import React, { useEffect, useState } from "react";
import "./main.css";
import NavTabs from "Components/NavTabs";
import { LoginNavTabOptions } from "Components/NavOptoins";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "Redux/Loader/loaderSlice";
import { useNavigate } from "react-router-dom";
import { editUser } from "Redux/User/userSlice";
import { auth } from "firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";

const Main = () => {
  const [active, setActive] = useState(LoginNavTabOptions[0]);
  // const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => dispatch(setLoader(false)), 1000);
  }, []);

  const [user] = useAuthState(auth);

  useEffect(() => {
    console.log(user);
    // if (auth.currentUser) {
    //   console.log("checking logged in");

    //   user.agency === "applicant"
    //     ? navigate("/applicant-home")
    //     : user.agency === "Super User"
    //     ? navigate("/super-home")
    //     : navigate("agency-home");
    // }
  });

  return (
    <>
      <div className="main-container">
        <div className="title-container">
          <h1>MINRC Job Portal</h1>
          <p>Welcome to the MINRC Job Portal.</p>
        </div>
        <Login />
      </div>
    </>
  );
};

export default Main;
