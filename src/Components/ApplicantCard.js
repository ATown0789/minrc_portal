import React, { useState } from "react";
import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";
import "./applicantcard.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "Redux/Loader/loaderSlice";
import emailjs, { send } from "@emailjs/browser";
import Button from "./Button";

const ApplicantCard = ({ applicant }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const contactTemplateParams = {
    agency: user.agency,
    from_email: "noreply@mg.minrcportal.com",
    to_email: applicant.email,
    from_name: user.agency,
    to_name: applicant.fName,
    subject: "You could be a good fit",
    reply_to: user.email,
    message1: `We believe you would be a great fit for a position in our agency.`,
    message2: `We would like to learn more about you and if you are searching for job opportunities.`,
    message3: `If you would like more information, please send your resume along with any letters of recommendation to ${user.email}.`,
    message4: `We look forward to hearing from you soon.`,
  };

  function toggleCard() {
    setIsExpanded(!isExpanded);
  }

  const sendEmail = (templateParams) => {
    emailjs
      .send(
        "service_8ocr1xq",
        "template_1t2yqye",
        templateParams,
        "up-OCrc-irKkF1wm_"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  //potentially make look nicer by adding paragraph breaks
  function truncateSummary(str) {
    const summaryLength = 150;
    if (str.length <= summaryLength) {
      return str;
    }
    return str.slice(0, summaryLength) + "...";
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
        <h2 className="job-title">
          {applicant.uid.substring(0, 10).toLowerCase()}
        </h2>
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
        <p className="job-summary">
          {truncateSummary(applicant.summary.join(" "))}
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
          <Button
            className="job-btn success"
            variant="success"
            onClick={() => {
              dispatch(setLoader(true));
              sendEmail(contactTemplateParams);
              navigate("/agency-home");
            }}
          >
            Contact
          </Button>
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
