import React, { useState, useId, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "Redux/User/userSlice";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
  db,
} from "../../firebase.config";
import { query, getDocs, collection, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import "./login.css";
import Loading from "../../Components/Loading";
import {
  browserSessionPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setLoader } from "Redux/Loader/loaderSlice";
import { loadJobs } from "Redux/Jobs/jobSlice";

const Login = ({ loginType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const userRef = useRef(user);

  const getUserData = async (user) => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      data.loggedIn = true;
      dispatch(editUser(data));
      //Not Needed?
      // console.log("GET  USER DATA", data);
      // data.agency === "applicant"
      //   ? navigate("/applicant-home")
      //   : data.agency === "Super User"
      //   ? navigate("/super-home")
      //   : data.agency !== "applicant" &&
      //     data.agency !== "default" &&
      //     data.agency !== "Super User"
      //   ? navigate("/agency-home")
      //   : navigate("/");
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (user) {
      getUserData(user);
    }
  }, []);

  const logInWithEmailAndPassword = async (auth, email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user;
      console.log(user);
      try {
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        data.loggedIn = true;
        dispatch(editUser(data));
        if (data.loggedIn)
          data.agency === "applicant"
            ? navigate("/applicant-home")
            : data.agency !== "applicant" &&
              data.agency !== "default" &&
              data.agency !== "Super User"
            ? navigate("/agency-home")
            : data.agency === "Super User"
            ? navigate("/super-home")
            : navigate("/");
      } catch (err) {
        console.error(err);
        alert("An error occured while fetching user data");
      }
      return user;
    } catch (err) {
      dispatch(setLoader(false));
      setErrorMessage("Username or password is invalid.");
    }
  };

  const id = useId();

  return (
    <div className={`form-container`}>
      <div className="form-inner-cont tab-content">
        <h2>{`${loginType === "agency" ? "Agency" : "Applicant"} Login`}</h2>
        <div className="form-group">
          <span className="login-element">
            <label className="nowrap" htmlFor={`username-${id}`}>
              Email:
            </label>
            <input
              type="text"
              id={`username-${id}`}
              placeholder="Email Address"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </span>
          <span className="login-element">
            <label className="nowrap" htmlFor={`password-${id}`}>
              Password:
            </label>
            <input
              type="password"
              id={`password-${id}`}
              placeholder="Enter Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </span>
          <p className="forgot-pass">
            <Link to="/forgot-password">Forgot Password</Link>
          </p>
        </div>
        <p className="input-error">{errorMessage}</p>
        <button
          className="login-btn"
          type="button"
          onClick={async (e) => {
            dispatch(setLoader(true));
            e.preventDefault();
            const isLoadCheck = await setPersistence(
              auth,
              browserSessionPersistence
            )
              .then(() => {
                return logInWithEmailAndPassword(auth, email, password);
              })
              .then();
            userRef.current = isLoadCheck;
            // if (isLoadCheck) fetchUserName();
          }}
        >
          Login
        </button>

        {/*
        Login with Google functions as expected, but I'm not sure it's desired at this point.
  
        {loginType === "applicant" && (
          <button
            className="login-btn google"
            type="button"
            onClick={async (e) => {
              e.preventDefault();
              const isLoadCheck = await signInWithGoogle();
              userRef.current = isLoadCheck;
              if (isLoadCheck) fetchUserName();
            }}
          >
            Login with Google
          </button>
        )} */}

        <p className="bottom-text">
          Not a MINRC student? <Link to={`new-${loginType}`}>Learn More.</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
