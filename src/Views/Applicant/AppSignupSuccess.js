import React, { useEffect } from "react";
import "./appsignupsuccess.css";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "firebase.config";
import { setLoader } from "Redux/Loader/loaderSlice";
import { useDispatch, useSelector } from "react-redux";

const AppSignupSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.loggedIn) navigate("/");
    setTimeout(() => dispatch(setLoader(false)), 1000);
  }, []);

  return (
    <div className="tab-content">
      <div className="success-container">
        <h2>You have successfully registered a new User</h2>

        <Link className="return-btn" to={"/super-home"}>
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default AppSignupSuccess;
