import React from "react";
import "./button.css";

const Button = ({ variant, onClick, children, style, active }) => {
  return (
    <button
      className={active ? `active ${variant}` : variant}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
