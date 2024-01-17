import React from "react";
import Button from "./Button";

const NavTabs = ({ setActive, active, options }) => {
  return (
    <div className="nav-tab-container">
      <div className="nav-tab-inner-cont">
        {options.map((tab, index) => (
          <Button
            variant={"nav-tab"}
            onClick={() => setActive(tab)}
            key={index}
            active={active.title === tab.title}
          >
            {tab.title}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default NavTabs;
