import React, { useEffect, useRef, useState } from "react";
import "./agencyhome.css";
import PostedPositions from "./PostedPositions";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "Components/Modal";
import { setLoader } from "Redux/Loader/loaderSlice";
import { collection, getDocs } from "firebase/firestore";
import { db, updateJob } from "firebase.config";
import { loadApplicants } from "Redux/Applicants/applicantSlice";
import { editJob, loadJobs } from "Redux/Jobs/jobSlice";
import MobileAgencyCard from "Components/MobileAgencyCard";
import Table from "Components/Table";

const AgencyHome = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const jobs = useSelector((state) => state.jobs);
  const applicants = useSelector((state) => state.applicants);
  const [modalToggle, setModalToggle] = useState(false);
  const [deleteJobId, setDeleteJobId] = useState("");
  const filteredJobs = useRef([]);
  const applicantsForFilter = useRef([]);
  const dispatch = useDispatch();

  const fetchJobs = async () => {
    const jobsCollection = collection(db, "jobs");
    await getDocs(jobsCollection)
      .then((response) => {
        const jobsArray = response.docs.map((doc) => ({
          ...doc.data(),
        }));
        dispatch(loadJobs(jobsArray));
        filteredJobs.current = jobsArray.filter((job) => {
          console.log("GETTING FILTERED JOBS");
          return job.agencyId === user.uid;
        });
      })
      .catch((error) => console.log(error.message));
  };

  const fetchApplicants = async () => {
    const applicantsCollection = collection(db, "users");
    await getDocs(applicantsCollection)
      .then((response) => {
        const usersArray = response.docs
          .map((doc) => ({
            ...doc.data(),
          }))
          .filter((user) => user.agency === "applicant");
        dispatch(loadApplicants(usersArray));
        applicantsForFilter.current = usersArray;
      })
      .catch((error) => console.log(error.message));
  };

  // function getApplicants() {
  //   const applicantsCollection = collection(db, "users");
  //   getDocs(applicantsCollection)
  //     .then((response) => {
  //       const usersArray = response.docs
  //         .map((doc) => ({
  //           ...doc.data(),
  //         }))
  //         .filter((user) => user.agency === "applicant");
  //       dispatch(loadApplicants(usersArray));
  //     })
  //     .catch((error) => console.log(error.message));
  // }

  // function getJobs() {
  //   const jobsCollection = collection(db, "jobs");
  //   getDocs(jobsCollection)
  //     .then((response) => {
  //       const jobsArray = response.docs.map((doc) => ({
  //         ...doc.data(),
  //       }));
  //       dispatch(loadJobs(jobsArray));

  //       setTimeout(() => dispatch(setLoader(false)), 1000);
  //     })
  //     .catch((error) => console.log(error.message));
  // }

  function stopLoader() {
    dispatch(setLoader(false));
  }

  useEffect(() => {
    console.log(filteredJobs.current.length);
    if (
      filteredJobs.current.length > 0 &&
      applicantsForFilter.current.length > 0
    ) {
      filteredJobs.current.forEach((job) => {
        let jobInterested = [];

        applicants.forEach((applicant) => {
          let interestedExist = !!applicant.interested;
          if (interestedExist) {
            if (
              applicant.interested.includes(job.id) &&
              !job?.contacted?.includes(applicant.uid) &&
              !job?.declined?.includes(applicant.uid)
            ) {
              jobInterested.push(applicant.uid);
            }
          }
        });

        let newJob = {
          ...job,
          interested: jobInterested,
        };

        dispatch(editJob(newJob));
        updateJob(newJob);
        setTimeout(stopLoader, 1500);
      });
    }
  }, [filteredJobs.current.length]);

  useEffect(() => {
    fetchApplicants();
    fetchJobs();
  }, []);

  useEffect(() => {
    const jobList = jobs.filter((job) => {
      return job.agencyId === user.uid;
    });

    filteredJobs.current = [...jobList];
  }, [jobs]);

  useEffect(() => {
    // setTimeout(() => dispatch(setLoader(false)), 1000);
    if (!user.loggedIn) navigate("/");
  });

  return user.loggedIn ? (
    <>
      {modalToggle && (
        <Modal
          modalToggle={modalToggle}
          setModalToggle={setModalToggle}
          deleteJobId={deleteJobId}
          modalType={"delete"}
        />
      )}
      <div className="tab-content">
        <h1>Dashboard</h1>
        <div className="mobile">
          {filteredJobs.current.map((job) => {
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
        {filteredJobs.current.length ? (
          <div className="desktop ">
            <Table
              jobs={filteredJobs.current}
              setDeleteJobId={setDeleteJobId}
              setModalToggle={setModalToggle}
            />
          </div>
        ) : (
          <div className="no-postings">
            <h1>No Positions Posted</h1>
            <Link className="primary" to={"/add-job"}>
              Create New Posting
            </Link>
          </div>
        )}
      </div>
    </>
  ) : (
    <div>Please log in to view this page</div>
  );
};

export default AgencyHome;
