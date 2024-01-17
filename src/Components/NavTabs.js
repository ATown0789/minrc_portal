import React from "react";
import Button from "./Button";

const NavTabs = ({ setActive, active, options }) => {
  return (
    <div style={{ display: "flex" }}>
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
  );
};

export default NavTabs;
