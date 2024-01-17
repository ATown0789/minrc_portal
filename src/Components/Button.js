import React from "react";

const Button = ({ variant, onClick, children }) => {
  return (
    <button className={variant} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
