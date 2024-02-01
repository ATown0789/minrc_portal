import React, { useEffect } from "react";
import * as BsIcons from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import "./postedPositions.css";
import { deleteJob } from "firebase.config";
import { useSelector } from "react-redux";

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

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
    if (!user.loggedIn) navigate("/");
  }, []);

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
      {superUser && <td>{job.dateCreated}</td>}
      {superUser && <td>{job.agency}</td>}
      <td className="applicant-col">
        <div className="applicant-container">
          {job.interested?.length > 0 ? (
            job.interested.map((applicant, index) => {
              return (
                <Link
                  className="applicant-btn"
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
      </td>

      <td className="applicant-col">
        <div className="applicant-container">
          {job.contacted?.length > 0 ? (
            job.contacted.map((applicant, index) => {
              return (
                <Link
                  className="applicant-btn"
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
      </td>

      <td className="applicant-col">
        <div className="applicant-container">
          {job.declined?.length > 0 ? (
            job.declined.map((applicant, index) => {
              return (
                <Link
                  className="applicant-btn"
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
      </td>
    </tr>
  );
};

export default PostedPositions;
