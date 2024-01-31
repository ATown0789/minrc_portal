import Login from "Views/Login/Login";
import React, { useEffect, useState } from "react";
import "./main.css";
import NavTabs from "Components/NavTabs";
import { LoginNavTabOptions } from "Components/NavOptoins";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "Redux/Loader/loaderSlice";
import { useNavigate } from "react-router-dom";
import { editUser } from "Redux/User/userSlice";
import { auth, db } from "firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

const Main = () => {
  const testUser = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();
  const [user] = useAuthState(auth);

  useEffect(() => {
    setTimeout(() => dispatch(setLoader(false)), 1000);
  }, []);

  const getUserData = async (user) => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      data.loggedIn = true;
      dispatch(editUser(data));
      console.log("Logged IN!");
      data.agency === "applicant"
        ? navigate("/applicant-home")
        : data.agency === "Super User"
        ? navigate("/super-home")
        : navigate("/agency-home");
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  // console.log(user);
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) getUserData(currentUser);
    });
  }, []);
  // useEffect(() => {
  //   //
  //   onAuthStateChanged(auth, (user) => {
  //     console.log(user);
  //     if (user) {
  //       // User is signed in, see docs for a list of available properties
  //       // https://firebase.google.com/docs/reference/js/firebase.User
  //       const uid = user.uid;
  //       getUserData();
  //       // getUserData(user);
  //     } else {
  //       console.log("not logged in");
  //       // User is signed out
  //       // ...
  //     }
  //   });
  // }, []);

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
