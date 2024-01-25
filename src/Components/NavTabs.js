import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

const NavTabs = ({ setActive, active, options }) => {
  return (
    <div className="nav-tab-container">
      <div className="nav-tab-inner-cont">
        {options.map((tab, index) => {
          if (tab.title !== "Applicants" && tab.title !== "Agencies")
            return (
              <Link
                to={tab.path}
                onClick={() => setActive(tab)}
                key={index}
                active={active.title === tab.title}
              >
                <Button
                  variant={"nav-tab"}
                  onClick={() => setActive(tab)}
                  key={index}
                  active={active.title === tab.title}
                >
                  {tab.icon}
                </Button>
              </Link>
            );
          else
            return (
              <Button
                variant={"nav-tab"}
                onClick={() => setActive(tab)}
                key={index}
                active={active.title === tab.title}
              >
                {tab.icon}
              </Button>
            );
        })}
      </div>
    </div>
  );
};

export default NavTabs;
