import React, { useEffect, useRef, useState } from "react";
// import "./superhome.css";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "Components/Modal";
import { setLoader } from "Redux/Loader/loaderSlice";
import { collection, getDocs } from "firebase/firestore";
import { db } from "firebase.config";
import { loadApplicants } from "Redux/Applicants/applicantSlice";
import { loadJobs } from "Redux/Jobs/jobSlice";
import PostedPositions from "Views/Agency/PostedPositions";
import MobileAgencyCard from "Components/MobileAgencyCard";
import { DownloadTableExcel, downloadExcel } from "react-export-table-to-excel";
import Button from "Components/Button";
import Table from "Components/Table";
import { TbFileDownload } from "react-icons/tb";

const SuperHome = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const jobs = useSelector((state) => state.jobs);
  const [modalToggle, setModalToggle] = useState(false);
  const [deleteJobId, setDeleteJobId] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const dispatch = useDispatch();
  const tableRef = useRef(null);
  const header = [
    "Positions Posted",
    "Date Created",
    "Agency",
    "Interested Applicants",
    "Contacted",
    "Declined",
    "Total Applicants",
  ];
  const date = new Date();
  let day = ("0" + date.getDate()).slice(-2);
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let year = date.getFullYear() - 2000;
  let currentDate = `${month}/${day}/${year}`;
  const body = [];
  jobs.map((job) => {
    const jobArray = [
      job.title,
      job.dateCreated,
      job.agency,
      job.interested?.length > 0 ? job.interested?.length : 0,
      job.contacted?.length > 0 ? job.contacted?.length : 0,
      job.declined?.length > 0 ? job.declined?.length : 0,
      (job.interested?.length > 0 ? job.interested?.length : 0) +
        (job.contacted?.length > 0 ? job.contacted?.length : 0) +
        (job.declined?.length > 0 ? job.declined?.length : 0),
    ];

    body.push(jobArray);
  });

  function handleDownloadExcel() {
    console.log(body);
    downloadExcel({
      fileName: `MINRC_Job_Portal_Data_${currentDate}`,
      tablePayload: {
        header,
        body: body,
      },
    });
  }

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
          modalType={"delete"}
        />
      )}
      <div className="tab-content">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>Dashboard</h1>
          <Button variant="primary download" onClick={handleDownloadExcel}>
            Eport Table
            <span style={{ fontSize: "32px" }}>
              <TbFileDownload />
            </span>
          </Button>
        </div>

        <div className="mobile">
          {jobs.map((job) => {
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
        {jobs.length ? (
          <div className="table-wrap">
            <Table
              jobs={jobs}
              setDeleteJobId={setDeleteJobId}
              setModalToggle={setModalToggle}
              superUser={true}
            />
          </div>
        ) : (
          <div className="no-postings">
            <h1>No Positions Posted</h1>
            <Link className="agency-btn posted-btn" to={"/add-job"}>
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

export default SuperHome;
