import React from "react";
import * as BsIcons from "react-icons/bs";
import { Link } from "react-router-dom";
import "./postedPositions.css";
import { deleteJob } from "firebase.config";

const PostedPositions = ({
  job,
  setModalToggle,
  setDeleteJobId,
  superUser,
}) => {
  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const url = slugify(job.title + job.id);

  return (
    <tr>
      <td>
        <h3>{job.title}</h3>
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
      </td>
      {superUser && <td>{!!job.dateCreated}</td>}
      {superUser && <td>{job.agency}</td>}
      <td className="applicant-col">
        <div className="applicant-container">
          {job.interested?.length > 0 ? (
            job.interested.map((applicant, index) => {
              return (
                <Link
                  className="applicant-btn"
                  to={`/applicant-${slugify(applicant)}`}
                  state={{ job: job }}
                >
                  Applicant {applicant.substring(0, 10)}
                </Link>
              );
            })
          ) : (
            <p>None Yet!</p>
          )}
        </div>
      </td>

      <td className="applicant-col">
        <div className="applicant-container">
          {job.contacted?.length > 0 ? (
            job.contacted.map((applicant, index) => {
              return (
                <Link
                  className="applicant-btn"
                  to={`/applicant-${slugify(applicant)}`}
                  state={{ job: job }}
                >
                  Applicant {applicant.substring(0, 10)}
                </Link>
              );
            })
          ) : (
            <p>None Yet!</p>
          )}
        </div>
      </td>

      <td className="applicant-col">
        <div className="applicant-container">
          {job.declined?.length > 0 ? (
            job.declined.map((applicant, index) => {
              return (
                <Link
                  className="applicant-btn"
                  to={`/applicant-${slugify(applicant)}`}
                  state={{ job: job }}
                >
                  Applicant {applicant.substring(0, 10)}
                </Link>
              );
            })
          ) : (
            <p>None Yet!</p>
          )}
        </div>
      </td>
    </tr>
  );
};

export default PostedPositions;
