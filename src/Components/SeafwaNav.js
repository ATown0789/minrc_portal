import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "./logo.svg";
import * as BsIcons from "react-icons/bs";
import "./navbar.css";

const home = <BsIcons.BsHouseDoorFill />;

const SeafwaNav = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="seafwa-container">
      <div
        className={open ? "hamburger open" : "hamburger"}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <div className="seafwa-logo-container">
        <Logo className="seafwa-logo" />
      </div>
      <nav
        className={open ? "seafwa-nav-container open" : "seafwa-nav-container"}
      >
        <ul className="seafwa-navbar">
          <li className="seafwa-menu-item">
            <Link to="https://seafwa.org/" className="seafwa-menu-link">
              {home}
            </Link>
          </li>
          <li className="seafwa-menu-item">
            <Link
              to="https://seafwa.org/about"
              className="seafwa-menu-link dropdown"
            >
              About
            </Link>
          </li>
          <li className="seafwa-menu-item">
            <Link
              to="https://seafwa.org/news"
              className="seafwa-menu-link dropdown"
            >
              News
            </Link>
          </li>
          <li className="seafwa-menu-item">
            <Link
              to="https://seafwa.org/events"
              className="seafwa-menu-link dropdown"
            >
              Events
            </Link>
          </li>
          <li className="seafwa-menu-item">
            <Link
              to="https://seafwa.org/journal"
              className="seafwa-menu-link dropdown"
            >
              Journal
            </Link>
          </li>
          <li className="seafwa-menu-item">
            <Link
              to="https://seafwa.org/awards"
              className="seafwa-menu-link dropdown"
            >
              Awards
            </Link>
          </li>
          <li className="seafwa-menu-item">
            <Link
              to="https://seafwa.org/resources"
              className="seafwa-menu-link dropdown"
            >
              Resources
            </Link>
          </li>
          <li className="seafwa-menu-item">
            <Link
              to="https://seafwa.org/committees"
              className="seafwa-menu-link dropdown"
            >
              Committees
            </Link>
          </li>
          <li className="seafwa-menu-item">
            <Link
              to="https://seafwa.org/initiatives"
              className="seafwa-menu-link"
            >
              Initiatives
            </Link>
          </li>
          <li className="seafwa-menu-item">
            <Link
              to="https://seafwa.org/foundation"
              className="seafwa-menu-link dropdown"
            >
              Foundation
            </Link>
          </li>
        </ul>
      </nav>
      <div className="minrc-title-container">
        <h1>Minorities in Natural Resources Conservation Committee</h1>
      </div>
      <div className="minrc-menu-container">
        <Link
          to="https://seafwa.org/committee/minrc"
          className="minrc-menu-item"
        >
          Overview
        </Link>
        <Link
          to="https://seafwa.org/committee/minrc/members"
          className="minrc-menu-item"
        >
          Members
        </Link>
        <Link
          to="https://seafwa.org/committee/minrc/documents"
          className="minrc-menu-item"
        >
          Documents
        </Link>
        <Link
          to="https://seafwa.org/committee/minrc/events"
          className="minrc-menu-item"
        >
          Events
        </Link>
        <span className="minrc-menu-item active">Jobs</span>
      </div>
    </div>
  );
};

export default SeafwaNav;
