import React, { useEffect, useState } from "react";
import Button from "./Button";
import { Link, useLocation } from "react-router-dom";
import { logout } from "firebase.config";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOutUser } from "Redux/User/userSlice";
import { IoMdLogOut } from "react-icons/io";

const NavTabs = ({ setActive, active, options }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  return (
    <div className="nav-tab-container">
      <div className="nav-tab-inner-cont">
        {options.map((tab, index) => {
          return (
            <Link
              to={tab.path}
              className={`nav-tab ${
                location.pathname === tab.path ? "active" : ""
              }`}
              onClick={() => setActive(tab)}
              key={index}
            >
              {!isMobile && tab.icon}
              {isMobile ? tab.icon : <span>{tab.title}</span>}
            </Link>
          );
        })}
        <Link
          className={"nav-tab last-tab"}
          to="logout"
          onClick={async (e) => {
            e.preventDefault();
            await logout();
            dispatch(logOutUser());
            navigate("/");
          }}
        >
          <IoMdLogOut /> {!isMobile && <span>Logout</span>}
        </Link>
      </div>
    </div>
  );
};

export default NavTabs;
