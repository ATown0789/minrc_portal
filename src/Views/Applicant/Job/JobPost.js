import Keyword from "Components/Keyword";
import React, { useEffect, useState } from "react";
import "./jobpost.css";
import * as MdIcons from "react-icons/md";
import { Link } from "react-router-dom";
import positionOptions from "../../../DUMMY_DATA/positionOptions.json";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "Redux/Loader/loaderSlice";

const JobPost = ({ job }) => {
  const [type, setType] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const url = slugify(job.title + job.id);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    setTimeout(() => dispatch(setLoader(false)), 1000);

    switch (job.type) {
      case "full":
        setType(positionOptions[0].label);
        break;
      case "part":
        setType(positionOptions[1].label);
        break;
      case "internship":
        setType(positionOptions[2].label);
        break;
      case "seasonal":
        setType(positionOptions[3].label);
        break;
      default:
        setType(null);
    }
  }, []);

  const dateFormat = (date) => {
    const dateArr = date.split("-");
    const year = dateArr.shift();
    dateArr.push(year);
    const dateStr = dateArr.join("/");
    return dateStr;
  };

  const isValidUrl = (urlString) => {
    try {
      return Boolean(new URL(urlString));
    } catch (e) {
      return false;
    }
  };

  return (
    <div className="jobpost-container">
      {user.agency === "applicant" ? (
        <div className="sticky-job-btn-container">
          <Link className="job-btn success sticky" to={"/apply-success"}>
            I'm Interested
          </Link>
        </div>
      ) : (
        <div className="sticky-job-btn-container">
          <Link className="job-btn edit sticky" to={`/edit-${url}`}>
            Edit Job
          </Link>
        </div>
      )}
      <h1>{job.title}</h1>
      <p>Applications due: {job.dueDate}</p>
      <h3>Location:</h3>
      <span className="location-pin">
        {job.location &&
          job.location.map((location, index) => {
            return (
              <span key={index}>
                <MdIcons.MdLocationPin />{" "}
                {typeof location != "object" ? location : location.value}
              </span>
            );
          })}
      </span>
      {job.remote && <p>Remote work possible</p>}
      <h3>Agency:</h3>
      <p>{job.agency}</p>
      <h3>Salary</h3>
      <p>{job.salary}</p>
      <h3>Estimated position dates: </h3>
      <p>
        {dateFormat(job.start)} - {dateFormat(job.end)}
      </p>
      {!!job.type && (
        <div className="job-info-container">
          <h3>Employment Type:</h3>
          <p>{type}</p>
        </div>
      )}
      <h3>Description:</h3>
      {job.description.map((paragraph, index) => {
        return (
          <p key={index} className="job-description">
            {paragraph}
          </p>
        );
      })}

      <h3>Areas of Interest:</h3>
      <ul>
        {job.aois &&
          job.aois.map((keyword, index) => {
            const keywordVal =
              typeof keyword != "object" ? keyword : keyword.label;
            return <Keyword keyword={keywordVal} key={index} />;
          })}
      </ul>
      <br />
      <h3>Preferred Skills:</h3>
      <ul>
        {job.skills.map((skill, index) => {
          return <li key={index}>{skill.label}</li>;
        })}
      </ul>
      <br />
      <h3>Additional Qualifications:</h3>
      <ul>
        {job.qualifications.map((qualifications, index) => {
          return <li key={index}>{qualifications}</li>;
        })}
      </ul>
      {!!job.responsibilities[0] && (
        <div className="job-info-container">
          <h3>Responsibilities:</h3>
          <ul>
            {job.responsibilities.map((responsibilities, index) => {
              return <li key={index}>{responsibilities}</li>;
            })}
          </ul>
        </div>
      )}

      {!!job.website && (
        <div className="job-info-container">
          <h4>Get more information here:</h4>
          {isValidUrl(job.website) ? (
            <a href={job.website}>
              <p>{job.website}</p>
            </a>
          ) : (
            <a href={`http://${job.website}`}>
              {" "}
              <p>{job.website}</p>
            </a>
          )}
        </div>
      )}

      {!!job.hiringName && (
        <div className="job-info-container">
          <h4>Reach out to hiring contact directly:</h4>
          <p>{job.hiringName}</p>
          <p>
            {job.hiringEmail && (
              <a href={`emailto:${job.hiringEmail}`}>{job.hiringEmail}</a>
            )}
          </p>
          <p>
            {job.hiringNumber && (
              <a href={`tel:${job.hiringNumber}`}>{job.hiringNumber}</a>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default JobPost;
