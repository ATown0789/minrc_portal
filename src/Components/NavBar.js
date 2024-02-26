import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import {
  ApplicantSidebarData,
  AgencySidebarData,
  defaultSidebarData,
  SuperSidebarData,
} from "./SidebarData";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "Redux/User/userSlice";
import { logout } from "firebase.config";

const NavBar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [sidebarData, setSidebarData] = useState(defaultSidebarData);
  const navigate = useNavigate();
  const myUser = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const showSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    setSidebarData(defaultSidebarData);
  }, []);

  useEffect(() => {
    myUser.agency === "applicant"
      ? setSidebarData(ApplicantSidebarData)
      : myUser.agency !== "applicant" &&
        myUser.agency !== "MINRC Job Portal Admin" &&
        myUser.loggedIn
      ? setSidebarData(AgencySidebarData)
      : myUser.agency === "MINRC Job Portal Admin"
      ? setSidebarData(SuperSidebarData)
      : setSidebarData(defaultSidebarData);
  }, [myUser]);

  return (
    <div className="nav-menu-parent">
      <div
        id="job-menu"
        className={sidebar ? "job-hamburger open" : "job-hamburger"}
        onClick={showSidebar}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <nav
        className={sidebar ? "nav-menu-container active" : "nav-menu-container"}
      >
        <ul className="nav-menu" onClick={showSidebar}>
          {sidebarData.map((item, index) => {
            let myItem = { ...item };

            if (myUser.loggedIn && myItem.title === "Profile") {
              myUser.agency === "applicant"
                ? (myItem.title = `${myUser.fName}'s Profile`)
                : (myItem.title = `${myUser.agency}'s Profile`);
            }

            if (myUser.loggedIn && myItem.title === "Home") {
              myUser.agency === "applicant"
                ? (myItem.path = `/applicant-home`)
                : myUser.agency === "MINRC Job Portal Admin"
                ? (myItem.path = `/super-home`)
                : (myItem.path = `/agency-home`);
              myItem.title = "Dashboard";
            }

            return myItem.path === "logout" ? (
              <li key={index} className="nav-item">
                <button
                  onClick={async () => {
                    await logout();
                    dispatch(logOutUser());
                    navigate("/");
                  }}
                >
                  {myItem.icon}
                  <span>{myItem.title}</span>
                </button>
              </li>
            ) : (
              <li key={index} className={"nav-item"}>
                <Link to={myItem.path}>
                  {myItem.icon}
                  <span>{myItem.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
