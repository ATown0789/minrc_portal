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
  title,
  disabled,
}) => {
  return (
    <button
      disabled={disabled}
      data-tooltip={title}
      style={style}
      id={id}
      className={
        active
          ? `active ${variant ? variant : ""}`
          : `${className ? className : ""} ${variant ? variant : ""}`
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
