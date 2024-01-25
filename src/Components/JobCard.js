import React, { useEffect, useState } from "react";
import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";
import "./jobcard.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editJob } from "Redux/Jobs/jobSlice";
import { updateJob } from "firebase.config";
import positionOptions from "../DUMMY_DATA/positionOptions.json";
import Button from "./Button";

const JobCard = ({ job, user }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [myMatch, setMyMatch] = useState(0);
  const [positionType, setPositionType] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function toggleCard() {
    setIsExpanded(!isExpanded);
  }

  const matchAois = () => {
    let numMatch = 0;
    !!job.aois &&
      job.aois.forEach((aoi) => {
        user.interests.forEach((interest) => {
          if (aoi.value === interest.value) numMatch = numMatch + 1;
        });
      });
    return numMatch;
  };

  const matchSkills = () => {
    let numMatch = 0;
    job.skills.forEach((skill) => {
      user.skills.forEach((uSkill) => {
        if (skill.value === uSkill.value) numMatch = numMatch + 1;
      });
    });
    return numMatch;
  };

  const updateJobMatch = () => {
    dispatch(editJob({ ...job, match: myMatch }));
  };

  useEffect(() => {
    const skillsNum = matchSkills();
    const interestNum = matchAois();
    const starRate = (skillsNum + interestNum) / 2;
    setMyMatch(Math.round(starRate));
    updateJobMatch();
  }, [myMatch]);

  const slugify = (str) =>
    !!str &&
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
          <p key={item} className="star on">
            &#9733;
          </p>
        ))}
      </>
    );
  }

  useEffect(() => {
    switch (job.type) {
      case "full":
        setPositionType(positionOptions[0].label);
        break;
      case "part":
        setPositionType(positionOptions[1].label);
        break;
      case "internship":
        setPositionType(positionOptions[2].label);
        break;
      case "seasonal":
        setPositionType(positionOptions[3].label);
        break;
      default:
        setPositionType(null);
    }
  }, []);

  const MAX_CHARS = 200;
  const MAX_AOIS = 3;

  function truncateText(text, length) {
    if (text.length <= length) {
      return text;
    }

    return text.substr(0, length) + "\u2026";
  }

  function truncateAois(aois, length) {
    if (aois.length <= length) {
      return aois;
    }

    return aois.slice(0, length);
  }

  return (
    <div className={isExpanded ? "show-full job-card" : "job-card"}>
      <div className="inner-job-container">
        <div className="star-container">
          <MatchLoop times={myMatch} />
        </div>
        <p className="due-date">Applications due by {job.dueDate}</p>
        <h2 className="job-title">{job.title}</h2>
        <div className="type-container">
          {job.remote && <span className="job-type card-remote">Remote</span>}
          <span className={`${job.type}-type job-type`}>{positionType}</span>
        </div>
        <span className="location-pin">
          {!!job.location && !job.location.length ? (
            <p>No Locations Listed</p>
          ) : (
            !!job.location &&
            job.location.map((location, index) => {
              return (
                <span key={index}>
                  <MdIcons.MdLocationPin /> {location.value}
                </span>
              );
            })
          )}
        </span>
        {!!job.summary && <p>{truncateText(job.summary[0], MAX_CHARS)}</p>}

        <div className="job-keyword-cont">
          {!!job.aois && !job.aois.length ? (
            <p>No Areas of Interest Listed</p>
          ) : (
            !!job.aois &&
            truncateAois(job.aois, MAX_AOIS).map((keyword, index) => {
              return (
                <span className="job-keyword" key={index}>
                  {typeof keyword != "object" ? keyword : keyword.label}
                </span>
              );
            })
          )}
          <span className="end-elispes">&#8230;</span>
        </div>
        <div className="card-btn-container">
          <Link
            className="primary card-btn"
            to={`/${slugify(job.title + job.id)}`}
          >
            Learn More
          </Link>
          <Button
            className="card-btn"
            variant="secondary"
            onClick={() => {
              let newJob = {
                ...job,
                interested: !!job.interested
                  ? job.interested.includes(user.uid)
                    ? [...job.interested]
                    : [...job.interested, user.uid]
                  : [user.uid],
              };
              updateJob(newJob);
              navigate("/apply-success");
            }}
          >
            I'm Interested
          </Button>
        </div>
      </div>
      {/* <span
        onClick={toggleCard}
        className={isExpanded ? "expanded chevron" : "chevron"}
        style={{ fontSize: "24px", justifySelf: "flex-end" }}
      >
        <BsIcons.BsChevronCompactDown />
      </span> */}
    </div>
  );
};

export default JobCard;
