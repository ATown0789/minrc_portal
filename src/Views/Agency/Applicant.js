import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./applicant.css";
import { Button } from "react-bootstrap";
import * as BsIcons from "react-icons/bs";
import { auth, updateJob } from "firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "Redux/Loader/loaderSlice";
import emailjs, { send } from "@emailjs/browser";

const Applicant = ({ applicant }) => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  let job = {};

  if (state) job = { ...state.job };

  console.log(job?.declined.includes(applicant.uid));

  const declineTemplateParams = {
    agency: user.agency,
    job: job?.title,
    from_email: "noreply@mg.minrcportal.com",
    to_email: applicant.email,
    from_name: user.agency,
    to_name: applicant.fName,
    subject: "Thank you for your interest",
    reply_to: !!job.hiringEmail
      ? job.hiringEmail
      : "noreply@mg.minrcportal.com",
    message1: `Thank you for your interest in the ${job?.title} position.`,
    message2: `Unfortunately we have decided to go with a different applicant at this time.`,
    message3: `We will keep your information in mind for any future openings.`,
    message4: `Thank you again for reaching out, and good luck on your future endeavors.`,
  };

  const contactTemplateParams = {
    agency: user.agency,
    job: job?.title,
    from_email: "noreply@mg.minrcportal.com",
    to_email: applicant.email,
    from_name: user.agency,
    to_name: applicant.fName,
    subject: "Thank you for your interest",
    reply_to: !!job.hiringEmail
      ? job.hiringEmail
      : "noreply@mg.minrcportal.com",
    message1: `Thank you for your interest in the ${job?.title} position.`,
    message2: `We believe you would be a great fit for the position.`,
    message3: `Please send your resume along with any letters of recommendation to ${user.email}.`,
    message4: `Thank you again for reaching out, and we look forward to hearing from you soon.`,
  };

  console.log(job);

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

  return (
    <>
      <div className="applicant-view-container">
        <h2>Applicant {applicant.uid.substring(0, 10)}</h2>
        {/* <h3>Email: {applicant.email}</h3> */}
        <div className="applicant-attributes-container">
          <h3>Skills:</h3>
          <span className="skill-container">
            {applicant.skills.map((skill) => (
              <span className="applicant-skill">{skill.label}</span>
            ))}
          </span>
        </div>
        <div className="applicant-attributes-container">
          <h3>Areas of Interest:</h3>
          <span className="skill-container">
            {applicant.interests.map((interest) => (
              <span className="applicant-skill">{interest.label}</span>
            ))}
          </span>
        </div>
        <div className="applicant-attributes-container">
          <h3>Educaiton Completed: </h3>
          <span className="skill-container">
            <h3>{applicant.education}</h3>
          </span>
        </div>
        <div className="applicant-attributes-container">
          <h3>Professional Summary: </h3>
          <span className="skill-container">
            {applicant.summary.map((paragraph) => (
              <p>{paragraph}</p>
            ))}
          </span>
        </div>
        <div className="button-container">
          {job.declined.includes(applicant.id) && (
            <Button
              onClick={() => {
                dispatch(setLoader(true));
                sendEmail(declineTemplateParams);
                console.log(job, applicant.uid);
                let removeIndex = job.interested.findIndex(
                  (element) => applicant.uid === element
                );
                console.log(removeIndex);
                let newInterested = [...job.interested];
                if (removeIndex !== -1) newInterested.splice(removeIndex, 1);
                let newJob = {
                  ...job,
                  interested: newInterested,
                  declined: !!job.declined
                    ? job.declined.includes(applicant.uid)
                      ? [...job.declined]
                      : [...job.declined, applicant.uid]
                    : [applicant.uid],
                };

                console.log(newJob);
                updateJob(newJob);
                navigate("/agency-home");
              }}
              className="applicant-button warning"
              variant="warning"
            >
              Decline
            </Button>
          )}
          <Button
            className="applicant-button "
            variant="success"
            onClick={() => {
              dispatch(setLoader(true));
              sendEmail(contactTemplateParams);
              console.log(job, applicant.uid);
              let removeIndex = job.interested.findIndex(
                (element) => applicant.uid === element
              );
              console.log(removeIndex);
              let newInterested = [];
              let newDeclined = [];
              let removeDeclineIndex = 0;
              if (!!job.interested) newInterested = [...job.interested];
              if (removeIndex !== -1) newInterested.splice(removeIndex, 1);
              else {
                removeDeclineIndex = job.declined.findIndex(
                  (element) => applicant.uid === element
                );
                if (removeDeclineIndex !== -1) {
                  newDeclined = [...job.declined];
                  newDeclined.splice(removeDeclineIndex, 1);
                }
              }
              let newJob = {
                ...job,
                interested: newInterested,
                declined: removeIndex ? job.declined : newDeclined,
                contacted: !!job.contacted
                  ? job.contacted.includes(applicant.uid)
                    ? [...job.contacted]
                    : [...job.contacted, applicant.uid]
                  : [applicant.uid],
              };

              console.log(newJob);
              updateJob(newJob);
              navigate("/agency-home");
            }}
          >
            Contact
          </Button>
        </div>
        <Link className="return-btn" to={"/agency-home"}>
          <BsIcons.BsArrowLeft /> Back to Dashboardoard
        </Link>
      </div>
    </>
  );
};

export default Applicant;
