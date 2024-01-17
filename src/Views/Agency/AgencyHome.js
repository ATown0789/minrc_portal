import React, { useEffect, useState } from "react";
import "./agencyhome.css";
import PostedPositions from "./PostedPositions";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "Components/Modal";
import { setLoader } from "Redux/Loader/loaderSlice";
import { collection, getDocs } from "firebase/firestore";
import { db } from "firebase.config";
import { loadApplicants } from "Redux/Applicants/applicantSlice";
import { loadJobs } from "Redux/Jobs/jobSlice";
import MobileAgencyCard from "Components/MobileAgencyCard";

const AgencyHome = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const jobs = useSelector((state) => state.jobs);
  const [modalToggle, setModalToggle] = useState(false);
  const [deleteJobId, setDeleteJobId] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const dispatch = useDispatch();

  function getApplicants() {
    const applicantsCollection = collection(db, "users");
    getDocs(applicantsCollection)
      .then((response) => {
        const usersArray = response.docs
          .map((doc) => ({
            ...doc.data(),
          }))
          .filter((user) => user.agency === "applicant");
        dispatch(loadApplicants(usersArray));
      })
      .catch((error) => console.log(error.message));
  }

  function getJobs() {
    const jobsCollection = collection(db, "jobs");
    getDocs(jobsCollection)
      .then((response) => {
        const jobsArray = response.docs.map((doc) => ({
          ...doc.data(),
        }));
        dispatch(loadJobs(jobsArray));

        setTimeout(() => dispatch(setLoader(false)), 1000);
      })
      .catch((error) => console.log(error.message));
  }

  useEffect(() => {
    getApplicants();
    getJobs();
    console.log("Jobs updated");
  }, []);

  useEffect(() => {
    const jobList = jobs.filter((job) => {
      return job.agencyId === user.uid;
    });
    setFilteredJobs(jobList);
  }, [jobs]);

  useEffect(() => {
    if (!user.loggedIn) navigate("/");
  });

  return user.loggedIn ? (
    <>
      {modalToggle && (
        <Modal
          modalToggle={modalToggle}
          setModalToggle={setModalToggle}
          deleteJobId={deleteJobId}
        />
      )}
      <h1 className="agency-h1">{user.agency}'s Dashboard</h1>
      <div className="mobile">
        {filteredJobs.map((job) => {
          console.log(job);
          return (
            <MobileAgencyCard
              key={job.id}
              job={job}
              setModalToggle={setModalToggle}
              setDeleteJobId={setDeleteJobId}
            />
          );
        })}
      </div>
      {filteredJobs.length ? (
        <div className="table-container desktop">
          {/* <Table striped bordered className="agency-table ">
            <thead>
              <tr>
                <th>Positions Posted</th>
                <th>Interested Applicants</th>
                <th>Contacted</th>
                <th>Declined Applicants</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job) => {
                return (
                  <PostedPositions
                    key={job.id}
                    job={job}
                    setModalToggle={setModalToggle}
                    setDeleteJobId={setDeleteJobId}
                  />
                );
              })}
            </tbody>
          </Table> */}
        </div>
      ) : (
        <div className="no-postings">
          <h1>No Positions Posted</h1>
          <Link className="agency-btn posted-btn" to={"/add-job"}>
            Create New Posting
          </Link>
        </div>
      )}
    </>
  ) : (
    <div>Please log in to view this page</div>
  );
};

export default AgencyHome;
