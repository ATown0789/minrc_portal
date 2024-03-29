import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./applicant.css";
import * as BsIcons from "react-icons/bs";
import { auth, updateJob } from "firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "Redux/Loader/loaderSlice";
import emailjs, { send } from "@emailjs/browser";
import Button from "Components/Button";
import { editJob } from "Redux/Jobs/jobSlice";
import { IoArrowBack } from "react-icons/io5";

const Applicant = ({ applicant }) => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.loggedIn) navigate("/");
  }, []);

  let job = {};

  if (state) job = { ...state.job };

  const superUser = !!state?.superUser;

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

  const interestTemplateParams = {
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

  const contactTemplateParams = {
    agency: user.agency,
    job: job?.title,
    from_email: "noreply@mg.minrcportal.com",
    to_email: applicant.email,
    from_name: user.agency,
    to_name: applicant.fName,
    subject: "You could be a good fit",
    reply_to: !!job.hiringEmail
      ? job.hiringEmail
      : "noreply@mg.minrcportal.com",
    message1: `We believe you would be a great fit for a position in our agency.`,
    message2: `We would like to learn more about you and if you are searching for job opportunities.`,
    message3: `If you would like more information, please send your resume along with any letters of recommendation to ${user.email}.`,
    message4: `We look forward to hearing from you soon.`,
  };

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
    <div className="tab-content">
      <div className="applicant-view-container">
        <h2>
          Applicant Id:
          <span className="applicant-id-text">{` ${applicant.uid
            .substring(0, 10)
            .toLowerCase()}`}</span>
        </h2>
        <div className="applicant-attributes-container">
          <h3>Educaiton Completed: </h3>
          <span className="skill-container">
            <h4>{applicant.education}</h4>
          </span>
        </div>
        <div className="applicant-attributes-container">
          <h3>Professional Summary: </h3>
          {applicant.summary.map((paragraph, index) => {
            return (
              <p key={index} className="job-description">
                {paragraph}
              </p>
            );
          })}
        </div>
        <div className="applicant-attributes-container">
          <h3>Skills:</h3>
          <span className="skill-container">
            {applicant.skills.map((skill, index) => (
              <span key={index} className="applicant-skill">
                {skill.label}
              </span>
            ))}
          </span>
        </div>
        <div className="applicant-attributes-container">
          <h3>Areas of Interest:</h3>
          <span className="skill-container">
            {applicant.interests.map((interest, index) => (
              <span key={index} className="applicant-skill">
                {interest.label}
              </span>
            ))}
          </span>
        </div>

        <div className="button-container">
          {console.log(job.declined)}

          {(job?.declined?.includes(applicant.uid) ||
            job?.contacted?.includes(applicant.uid)) && (
            <Button
              variant={"primary secondary"}
              onClick={() => {
                navigate(-1);
              }}
            >
              <IoArrowBack /> Back
            </Button>
          )}
          {!job?.declined?.includes(applicant.uid) &&
            !job?.contacted?.includes(applicant.uid) && (
              <Button
                onClick={() => {
                  dispatch(setLoader(true));
                  sendEmail(declineTemplateParams);

                  let removeIndex = job.interested.findIndex(
                    (element) => applicant.uid === element
                  );
                  let newInterested = [...job.interested];
                  if (removeIndex !== -1) newInterested.splice(removeIndex, 1);
                  let updatedInterestedJob = {
                    ...job,
                    interested: newInterested,
                    declined: !!job.declined
                      ? job.declined.includes(applicant.uid)
                        ? [...job.declined]
                        : [...job.declined, applicant.uid]
                      : [applicant.uid],
                  };

                  updateJob(updatedInterestedJob);
                  dispatch(editJob(updatedInterestedJob));
                  user.agency === "MINRC Job Portal Admin"
                    ? navigate("/super-home")
                    : navigate("/agency-home");
                }}
                variant="primary delete"
              >
                Decline
              </Button>
            )}
          {!job?.declined?.includes(applicant.uid) &&
            !job?.contacted?.includes(applicant.uid) && (
              <Button
                variant="primary"
                onClick={() => {
                  dispatch(setLoader(true));
                  Object.keys(job).length !== 0
                    ? sendEmail(interestTemplateParams)
                    : sendEmail(contactTemplateParams);
                  let removeIndex = job?.interested?.findIndex(
                    (element) => applicant.uid === element
                  );
                  let newInterested = [...job.interested];
                  if (removeIndex !== -1) newInterested.splice(removeIndex, 1);
                  /****** REMOVED BECAUSE WE NO LONGER ALLOW CONTACT AFTER BEING DECLINED */
                  // let newDeclined = [];
                  // let removeDeclineIndex = 0;
                  // if (!!job?.interested) newInterested = [...job?.interested];
                  // if (removeIndex !== -1) newInterested.splice(removeIndex, 1);
                  // else {
                  //   removeDeclineIndex = job.declined?.findIndex(
                  //     (element) => applicant.uid === element
                  //   );
                  //   if (removeDeclineIndex !== -1) {
                  //     newDeclined = [...job?.declined];
                  //     newDeclined.splice(removeDeclineIndex, 1);
                  //   }
                  // }
                  let updatedInterestedJob = {
                    ...job,
                    interested: newInterested,

                    contacted: !!job.contacted
                      ? job.contacted.includes(applicant.uid)
                        ? [...job.contacted]
                        : [...job.contacted, applicant.uid]
                      : [applicant.uid],
                  };

                  updateJob(updatedInterestedJob);
                  dispatch(editJob(updatedInterestedJob));
                  user.agency === "MINRC Job Portal Admin"
                    ? navigate("/super-home")
                    : navigate("/agency-home");
                }}
              >
                Contact
              </Button>
            )}
        </div>
      </div>
    </div>
  );
};

export default Applicant;
