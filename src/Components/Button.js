import React from "react";
import "./button.css";

const Button = ({
  variant,
  onClick,
  children,
  style,
  active,
  id,
  className,
}) => {
  return (
    <button
      style={style}
      id={id}
      className={
        active ? `active primary ${variant}` : `${className} primary ${variant}`
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
