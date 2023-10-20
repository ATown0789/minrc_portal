import React from "react";
import "./seafwafooter.css";
import { Link } from "react-router-dom";

const SeafwaFooter = () => {
  return (
    <div className="seafwa-footer">
      <div className="footer-nav-container">
        <h4>Contacts</h4>
        <Link
          to="https://seafwa.org/about/staff"
          className="seafwa-footer-link"
        >
          Staff
        </Link>
        <Link
          to="https://seafwa.org/about/officers"
          className="seafwa-footer-link"
        >
          Officers
        </Link>
        <Link to="https://seafwa.org/committees" className="seafwa-footer-link">
          Committees
        </Link>
      </div>
    </div>
  );
};

export default SeafwaFooter;
