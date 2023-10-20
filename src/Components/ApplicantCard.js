import React, { useState } from "react";
import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";
import "./applicantcard.css";
import { Link } from "react-router-dom";

const ApplicantCard = ({ applicant }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  console.log(applicant);

  function toggleCard() {
    setIsExpanded(!isExpanded);
  }

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  function MatchLoop({ times }) {
    const keys = [...Array(times).keys()];
    return (
      <>
        {keys.map((item) => (
          <span key={item} className="job-star">
            &#9733;
          </span>
        ))}
      </>
    );
  }

  return (
    <div className={isExpanded ? "show-full job-card" : "job-card"}>
      <div className="inner-job-container">
        <p className="due-date">
          {/* <span style={{ float: "right" }}>
            <MatchLoop times={applicant.match} />
          </span> */}
        </p>
        <h2 className="job-title">{applicant.uid.substring(0, 10)}</h2>
        <p className="job-summary">
          Education completed:
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            {applicant.education}
          </span>
        </p>

        <span className="location-pin">
          <span>
            <MdIcons.MdLocationPin /> {applicant.stateSel}
          </span>
        </span>
        <div className="job-keyword-cont">
          {applicant.skills.map((skill, index) => {
            return (
              <span className="job-keyword" key={index}>
                {skill.label}
              </span>
            );
          })}
        </div>
        <div className="card-btn-container">
          <Link className="job-btn" to={`/applicant-${slugify(applicant.uid)}`}>
            Learn More
          </Link>
          <Link className="job-btn success" to={"/apply-success"}>
            Contact
          </Link>
        </div>
      </div>
      <span
        onClick={toggleCard}
        className={isExpanded ? "expanded chevron" : "chevron"}
        style={{ fontSize: "24px", justifySelf: "flex-end" }}
      >
        <BsIcons.BsChevronCompactDown />
      </span>
    </div>
  );
};

export default ApplicantCard;
