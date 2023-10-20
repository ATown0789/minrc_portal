import React, { useEffect, useState } from "react";
import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";
import "./jobcard.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editJob } from "Redux/Jobs/jobSlice";
import { updateJob } from "firebase.config";

const JobCard = ({ job, user }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [myMatch, setMyMatch] = useState(0);
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
          Applications due by {job.dueDate}
          <span style={{ float: "right" }}>
            <MatchLoop times={myMatch} />
          </span>
        </p>

        <h2 className="job-title">{job.title}</h2>
        {!!job.summary &&
          job.summary.map((paragraph, index) => {
            return <p key={index}>{paragraph}</p>;
          })}

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
        <div className="job-keyword-cont">
          {!!job.aois && !job.aois.length ? (
            <p>No Areas of Interest Listed</p>
          ) : (
            !!job.aois &&
            job.aois.map((keyword, index) => {
              return (
                <span className="job-keyword" key={index}>
                  {typeof keyword != "object" ? keyword : keyword.label}
                </span>
              );
            })
          )}
        </div>
        <div className="card-btn-container">
          <Link className="job-btn" to={`/${slugify(job.title + job.id)}`}>
            Learn More
          </Link>
          <button
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
            className="job-btn success"
          >
            I'm Interested
          </button>
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

export default JobCard;
