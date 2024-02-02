import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import * as BsIcons from "react-icons/bs";
import "./table.css";

const Table = ({ jobs, setModalToggle, setDeleteJobId, superUser }) => {
  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  return (
    <div className="table-container" role="table">
      <div className="flex-table header" role="rowgroup">
        <div className="flex-row first" role="columnheader">
          Position
        </div>
        <div className="flex-row" role="columnheader">
          Interested Applicants
        </div>
        <div className="flex-row" role="columnheader">
          Contacted Applicants
        </div>
        <div className="flex-row" role="columnheader">
          Declined Applicants
        </div>
      </div>
      {jobs.map((job, index) => {
        const url = slugify(job.title + job.id);
        return (
          <div
            key={index}
            className={
              index % 2 !== 0
                ? "flex-table row even-row"
                : "flex-table row odd-row"
            }
            role="rowgroup"
          >
            <div className="flex-row first" role="cell">
              <div className="first-cell-container">
                {job.title}
                <div className="table-btn-container">
                  <Link
                    to={`/view-${url}`}
                    className="posted-btn view-job-button"
                  >
                    <BsIcons.BsEye />
                  </Link>
                  <Link
                    to={`/edit-${url}`}
                    className="posted-btn edit-job-button"
                  >
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
            </div>
            <div className="flex-row" role="cell">
              <div className="applicant-container">
                {job.interested?.length > 0 ? (
                  job.interested.map((applicant, index) => {
                    return (
                      <Link
                        key={index}
                        className="applicant-btn"
                        to={`/applicant-${slugify(applicant)}`}
                        state={{
                          job: job,
                          superUser: superUser,
                        }}
                      >
                        <span style={{ fontWeight: "bold", marginLeft: "0" }}>
                          ID:
                        </span>

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
            <div className="flex-row" role="cell">
              <div className="applicant-container">
                {job.contacted?.length > 0 ? (
                  job.contacted.map((applicant, index) => {
                    return (
                      <Link
                        key={index}
                        className="applicant-btn"
                        to={`/applicant-${slugify(applicant)}`}
                        state={{
                          job: job,
                          superUser: superUser,
                        }}
                      >
                        <span style={{ fontWeight: "bold", marginLeft: "0" }}>
                          ID:
                        </span>
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
            <div className="flex-row" role="cell">
              <div className="applicant-container">
                {job.declined?.length > 0 ? (
                  job.declined.map((applicant, index) => {
                    return (
                      <Link
                        key={index}
                        className="applicant-btn"
                        to={`/applicant-${slugify(applicant)}`}
                        state={{
                          job: job,
                          superUser: superUser,
                        }}
                      >
                        <span style={{ fontWeight: "bold", marginLeft: "0" }}>
                          ID:
                        </span>
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
          </div>
        );
      })}
      <div className="table-row-a"></div>
    </div>
  );
};

export default Table;
