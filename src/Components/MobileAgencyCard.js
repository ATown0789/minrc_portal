import React, { useEffect, useState } from "react";
import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";
import "./jobcard.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editJob } from "Redux/Jobs/jobSlice";
import { updateJob } from "firebase.config";

const MobileAgencyCard = ({
  job,
  user,
  setModalToggle,
  setDeleteJobId,
  superUser,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [myMatch, setMyMatch] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function toggleCard() {
    setIsExpanded(!isExpanded);
  }

  const slugify = (str) =>
    !!str &&
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const url = slugify(job.title + job.id);

  return (
    <div
      className={
        isExpanded
          ? "show-full job-card agency-mobile"
          : "job-card agency-mobile"
      }
    >
      <div className="inner-job-container">
        <h2 className="job-title">{job.title}</h2>

        <div className="mobile-agency-buttons-cont">
          <Link to={`/view-${url}`} className="posted-btn view-job-button">
            <BsIcons.BsEye />
          </Link>
          <Link to={`/edit-${url}`} className="posted-btn edit-job-button">
            <BsIcons.BsPencilFill />
          </Link>
          <button
            onClick={() => {
              setDeleteJobId(job.id);
              setModalToggle(true);
            }}
            className="posted-btn remove-job-button"
          >
            <BsIcons.BsTrash />
          </button>
        </div>
        <h3>Interested:</h3>
        <div className="applicant-container">
          {job.interested?.length > 0 ? (
            job.interested.map((applicant, index) => {
              return (
                <Link
                  className="applicant-btn agency-mobile-btn"
                  to={`/applicant-${slugify(applicant)}`}
                  state={{
                    job: job,
                    superUser: superUser,
                  }}
                >
                  Applicant ID:
                  <span className="applicant-id-text">
                    {` ${applicant.substring(0, 10).toLowerCase()}`}
                  </span>
                </Link>
              );
            })
          ) : (
            <p>None Yet!</p>
          )}
        </div>
        <h3>Contacted:</h3>
        <div className="applicant-container">
          {job.contacted?.length > 0 ? (
            job.contacted.map((applicant, index) => {
              return (
                <Link
                  className="applicant-btn agency-mobile-btn"
                  to={`/applicant-${slugify(applicant)}`}
                  state={{
                    job: job,
                    superUser: superUser,
                  }}
                >
                  Applicant ID:
                  <span className="applicant-id-text">
                    {` ${applicant.substring(0, 10).toLowerCase()}`}
                  </span>
                </Link>
              );
            })
          ) : (
            <p>None Yet!</p>
          )}
        </div>
        <h3>Declined:</h3>
        <div className="applicant-container">
          {job.contacted?.length > 0 ? (
            job.contacted.map((applicant, index) => {
              return (
                <Link
                  className="applicant-btn agency-mobile-btn"
                  to={`/applicant-${slugify(applicant)}`}
                  state={{
                    job: job,
                    superUser: superUser,
                  }}
                >
                  Applicant ID:
                  <span className="applicant-id-text">
                    {` ${applicant.substring(0, 10).toLowerCase()}`}
                  </span>
                </Link>
              );
            })
          ) : (
            <p>None Yet!</p>
          )}
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

export default MobileAgencyCard;
