import Keyword from "Components/Keyword";
import React, { useEffect, useState } from "react";
import "./jobpost.css";
import { Link, useNavigate } from "react-router-dom";
import positionOptions from "../../../DUMMY_DATA/positionOptions.json";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "Redux/Loader/loaderSlice";
import { BsBuildings } from "react-icons/bs";
import { FaMoneyBills } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaBriefcase, FaRegCalendarAlt } from "react-icons/fa";
import Button from "Components/Button";
import { IoArrowBack } from "react-icons/io5";
import { editUser } from "Redux/User/userSlice";
import { updateUser } from "firebase.config";

const JobPost = ({ job }) => {
  const [type, setType] = useState();
  const [width, setWidth] = useState(window.innerWidth);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let interested = [];
  let interestExist = !!user.interested;
  let interestedDisable = interestExist
    ? user.interested.includes(job.id)
    : false;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  const isMobile = width <= 768;

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const url = slugify(job.title + job.id);

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

  //*** REMOVED TO ALLOW FOR FLEXIBLE DATE ENTRY ***/
  // const dateFormat = (date) => {
  //   const dateArr = date.split("-");
  //   const year = dateArr.shift();
  //   dateArr.push(year);
  //   const dateStr = dateArr.join("/");
  //   return dateStr;
  // };

  const isValidUrl = (urlString) => {
    try {
      return Boolean(new URL(urlString));
    } catch (e) {
      return false;
    }
  };

  return (
    <div className="tab-content">
      <Link
        to={
          user.agency === "applicant"
            ? "/applicant-home"
            : user.agency === "MINRC Job Portal Admin"
            ? "/super-home"
            : "/agency-home"
        }
      >
        Job Board
      </Link>
      <span>{`>`}</span> <span>Job Details</span>
      <h2 style={{ marginTop: "20px" }}>Job Details</h2>
      <div className="job-details-container">
        {!isMobile && (
          <div className="job-head-container">
            <div className="top-job-head">
              <div
                style={{
                  width: "80%",
                }}
              >
                <p className="due-date">Applications due: {job.dueDate}</p>
                <h2 style={{ marginLeft: "0" }}>{job.title}</h2>
              </div>
              <div
                style={{
                  width: "20%",
                }}
              >
                {user.agency === "applicant" ? (
                  <Button
                    style={{
                      width: "100%",
                      margin: "5px",
                      lineHeight: "2",
                      textAlign: "center",
                    }}
                    disabled={interestedDisable}
                    title="Send a notification to the Agency that you're interested in the position"
                    className="card-btn"
                    variant={
                      interestedDisable ? "secondary disabled" : "secondary"
                    }
                    onClick={() => {
                      console.log(user);

                      !interestExist
                        ? interested.push(job.id)
                        : !user.interested.includes(job.id)
                        ? (interested = [...user.interested, job.id])
                        : (interested = [...user.interested]);

                      console.log(interested);
                      let updatedUser = {
                        ...user,
                        interested: interested,
                      };
                      dispatch(editUser(updatedUser));
                      updateUser(updatedUser);
                      // let newJob = {
                      //   ...job,
                      //   interested: !!job.interested
                      //     ? job.interested.includes(user.uid)
                      //       ? [...job.interested]
                      //       : [...job.interested, user.uid]
                      //     : [user.uid],
                      // };
                      // updateJob(newJob);
                      navigate("/apply-success");
                    }}
                  >
                    I'm Interested
                  </Button>
                ) : (
                  <Link
                    style={{
                      width: "20%",
                      margin: "5px",
                      lineHeight: "2",
                      textAlign: "center",
                      justifySelf: "flex-end",
                    }}
                    className="primary secondary interest-btn"
                    to={`/edit-${url}`}
                  >
                    Edit Job
                  </Link>
                )}
              </div>
            </div>

            <div className="bottom-job-head">
              <div className="flex-column">
                <h4>
                  <span className="job-detail-icon">
                    <FaLocationDot />
                  </span>
                  Location
                </h4>
                <p className="job-detail-text">
                  {job.location &&
                    job.location.map((location, index) => {
                      let comma = ", ";
                      let stateName = location?.label.slice(5);
                      index === job.location.length - 1
                        ? (comma = "")
                        : (comma = ", ");
                      return stateName + comma;
                    })}
                  {job.remote && (
                    <p className="job-detail-text parenthesis-text">
                      (Remote work possible)
                    </p>
                  )}
                </p>
              </div>
              <div className="flex-column">
                <h4>
                  <span className="job-detail-icon">
                    <BsBuildings />
                  </span>
                  Agency
                </h4>
                <p className="job-detail-text"> {job.agency}</p>
              </div>
              <div className="flex-column">
                <h4>
                  <span className="job-detail-icon">
                    <FaMoneyBills />
                  </span>
                  Salary
                </h4>
                <p className="job-detail-text">{job.salary}</p>
              </div>

              <div className="flex-column">
                <h4>
                  <span className="job-detail-icon">
                    <FaBriefcase />
                  </span>
                  Employment Type
                </h4>
                <div className="type-container">
                  {job.remote && <span className="card-remote">Remote</span>}
                  <p className={`${job.type}-type job-type job-detail-text`}>
                    {type}
                  </p>
                </div>
              </div>
              <div className="flex-column">
                <h4>
                  <span className="job-detail-icon">
                    <FaRegCalendarAlt />
                  </span>
                  Estimated position dates
                </h4>
                <p className="job-detail-text">
                  {`${job?.start === "" ? "No start date given" : job.start} -
                  ${job?.end === "" ? "No end date given" : job.end}`}
                </p>
              </div>
            </div>
          </div>
        )}
        {isMobile && (
          <div>
            <p className="due-date">Applications due: {job.dueDate}</p>
            <h2 style={{ marginLeft: "0" }}>{job.title}</h2>
            <h4>
              <span className="job-detail-icon">
                <FaLocationDot />
              </span>
              Location
            </h4>
            <p className="job-detail-text">
              {job.location &&
                job.location.map((location, index) => {
                  let comma = ", ";
                  let stateName = location?.label.slice(5);
                  index === job.location.length - 1
                    ? (comma = "")
                    : (comma = ", ");
                  return stateName + comma;
                })}
            </p>
            {job.remote && (
              <p className="job-detail-text parenthesis-text">
                (Remote work possible)
              </p>
            )}
            <h4>
              <span className="job-detail-icon">
                <BsBuildings />
              </span>
              Agency
            </h4>
            <p className="job-detail-text"> {job.agency}</p>
            <h4>
              <span className="job-detail-icon">
                <FaMoneyBills />
              </span>
              Salary
            </h4>
            <p className="job-detail-text">{job.salary}</p>
            <h4>
              <h4>
                <span className="job-detail-icon">
                  <FaBriefcase />
                </span>
                Employment Type
              </h4>
              <div className="type-container">
                {job.remote && <span className="card-remote">Remote</span>}
                <p className={`${job.type}-type job-type job-detail-text`}>
                  {type}
                </p>
              </div>
              <span className="job-detail-icon">
                <FaRegCalendarAlt />
              </span>
              Estimated position dates
            </h4>
            <p className="job-detail-text">
              {`${job?.start === "" ? "No start date given" : job.start} -
                  ${job?.end === "" ? "No end date given" : job.end}`}
            </p>

            {user.agency === "applicant" ? (
              <Button
                style={{ margin: "15px 5px", lineHeight: "2" }}
                disabled={interestedDisable}
                title="Send a notification to the Agency that you're interested in the position"
                className="card-btn"
                variant={interestedDisable ? "secondary disabled" : "secondary"}
                onClick={() => {
                  console.log(user);

                  !interestExist
                    ? interested.push(job.id)
                    : !user.interested.includes(job.id)
                    ? (interested = [...user.interested, job.id])
                    : (interested = [...user.interested]);

                  console.log(interested);
                  let updatedUser = {
                    ...user,
                    interested: interested,
                  };
                  dispatch(editUser(updatedUser));
                  updateUser(updatedUser);
                  // let newJob = {
                  //   ...job,
                  //   interested: !!job.interested
                  //     ? job.interested.includes(user.uid)
                  //       ? [...job.interested]
                  //       : [...job.interested, user.uid]
                  //     : [user.uid],
                  // };
                  // updateJob(newJob);
                  navigate("/apply-success");
                }}
              >
                I'm Interested
              </Button>
            ) : (
              <Link
                style={{ margin: "5px", lineHeight: "4.5" }}
                className="primary secondary interest-btn"
                to={`/edit-${url}`}
              >
                Edit Job
              </Link>
            )}
          </div>
        )}

        <hr />

        <h2>Job Description</h2>
        {job.description.map((paragraph, index) => {
          return (
            <p key={index} className="job-description">
              {paragraph}
            </p>
          );
        })}
        <h4>Areas of Interest:</h4>
        <ul>
          {job.aois &&
            job.aois.map((keyword, index) => {
              const keywordVal =
                typeof keyword != "object" ? keyword : keyword.label;
              return <Keyword keyword={keywordVal} key={index} />;
            })}
        </ul>
        <br />
        <h4>Preferred Skills:</h4>
        <ul>
          {job.skills.map((skill, index) => {
            return <li key={index}>{skill.label}</li>;
          })}
        </ul>
        <br />
        <h4>Additional Qualifications:</h4>
        <ul>
          {job.qualifications.map((qualifications, index) => {
            return <li key={index}>{qualifications}</li>;
          })}
        </ul>
        {!!job.responsibilities[0] && (
          <div className="job-info-container">
            <h4>Responsibilities:</h4>
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
        <Button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "30px 30px 30px auto",
            width: "200px",
          }}
          variant="primary"
          onClick={() => navigate(-1)}
        >
          <IoArrowBack style={{ marginRight: "5px" }} /> Back
        </Button>
      </div>
    </div>
  );
};

export default JobPost;
