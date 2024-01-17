import Login from "Views/Login/Login";
import React, { useEffect, useState } from "react";
import "./main.css";
import NavTabs from "Components/NavTabs";
import { LoginNavTabOptions } from "Components/NavData";
import { useDispatch } from "react-redux";
import { setLoader } from "Redux/Loader/loaderSlice";

const Main = () => {
  const [active, setActive] = useState(LoginNavTabOptions[0]);

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => dispatch(setLoader(false)), 1000);
  }, []);

  return (
    <div className="main-container">
      <div className="title-container">
        <h1>MINRC Job Portal</h1>
        <p>Welcome to the MINRC Job Portal.</p>
      </div>

      <div>
        <NavTabs
          setActive={setActive}
          active={active}
          options={LoginNavTabOptions}
        />
        {active.title === "Agencies" ? (
          <Login loginType="agency" />
        ) : (
          <Login loginType="applicant" />
        )}
      </div>
    </div>
  );
};

export default Main;
