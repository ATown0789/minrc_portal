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
    <div className="table-container mobile-agency">
      <div className="table-header mobile-agency">
        <p>Position</p>
      </div>
      <div className="first-cell-container mobile-agency">
        {job.title}
        <div className="table-btn-container">
          <Link to={`/view-${url}`} className="posted-btn view-job-button">
            <BsIcons.BsEye />
          </Link>
          <Link to={`/edit-${url}`} className="posted-btn edit-job-button">
            <BsIcons.BsPencilFill />
          </Link>
          <Link
            onClick={() => {
              setDeleteJobId(job.id);
              setModalToggle(true);
            }}
            className="posted-btn remove-job-button"
          >
            <BsIcons.BsTrash />
          </Link>
        </div>
      </div>
      <div className="table-header mobile-agency">
        <p>Interested Applicants</p>
      </div>
      <div className="applicant-container mobile-agency">
        {job.interested?.length > 0 ? (
          job.interested.map((applicant, index) => {
            console.log(applicant);
            return (
              <Link
                className="applicant-btn mobile-agency"
                to={`/applicant-${slugify(applicant)}`}
                state={{
                  job: job,
                  superUser: superUser,
                }}
              >
                <span style={{ fontWeight: "bold", marginLeft: "0" }}>ID:</span>

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
      <div className="table-header mobile-agency">
        <p>Contacted Applicants</p>
      </div>
      <div className="applicant-container mobile-agency">
        {job.contacted?.length > 0 ? (
          job.contacted.map((applicant, index) => {
            return (
              <Link
                className="applicant-btn mobile-agency"
                to={`/applicant-${slugify(applicant)}`}
                state={{
                  job: job,
                  superUser: superUser,
                }}
              >
                <span style={{ fontWeight: "bold", marginLeft: "0" }}>ID:</span>
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
      <div className="table-header mobile-agency">
        <p>Declined Applicants</p>
      </div>
      <div className="applicant-container mobile-agency">
        {job.declined?.length > 0 ? (
          job.declined.map((applicant, index) => {
            return (
              <Link
                className="applicant-btn mobile-agency"
                to={`/applicant-${slugify(applicant)}`}
                state={{
                  job: job,
                  superUser: superUser,
                }}
              >
                <span style={{ fontWeight: "bold", marginLeft: "0" }}>ID:</span>
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
  );
};

export default MobileAgencyCard;
