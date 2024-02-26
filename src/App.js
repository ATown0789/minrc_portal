import { Routes, Route, useNavigate, redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "firebase.config";
import { loadJobs } from "Redux/Jobs/jobSlice";
import Main from "Views/Main/Main";
import ApplicantHome from "Views/Applicant/ApplicantHome";
import AgencyHome from "Views/Agency/AgencyHome";
import AgencySignup from "Views/Agency/AgencySignup";
import ApplicantSignup from "Views/Applicant/ApplicantSignup";
import JobPost from "Views/Applicant/Job/JobPost";
import NavBar from "Components/NavBar";
import ApplySuccess from "./Views/Applicant/ApplySuccess";
import Applicant from "Views/Agency/Applicant";
import AddJob from "Views/Agency/Job/AddJob";
import ViewApplicants from "Views/Agency/ViewApplicants";
import SeafwaNav from "Components/SeafwaNav";
import SeafwaFooter from "Components/SeafwaFooter";
import { useSelector, useDispatch } from "react-redux";
import Contact from "Views/Contact/Contact";
import ApplicantProfile from "Views/Applicant/ApplicantProfile";
import AgencyProfile from "Views/Agency/AgencyProfile";
import JobPostSuccess from "Views/Agency/Job/JobPostSuccess";
import EditJob from "Views/Agency/Job/EditJob";
import EditApplicantProfile from "Views/Applicant/EditApplicantProfile";
import Loading from "Components/Loading";
import AppSignupSuccess from "Views/Applicant/AppSignupSuccess";
import ForgotPassword from "Views/Login/ForgotPassword";
import ResetPassword from "Views/Login/ResetPassword";
import ResetSuccess from "Views/Login/ResetSuccess";
import { Navigate } from "react-router-dom";
import SuperHome from "Views/Super/SuperHome";
import NavTabs from "Components/NavTabs";
import {
  AgencyTabOptions,
  ApplicantTabOptions,
  SuperTabOptions,
} from "Components/NavOptoins";
import AddUser from "Views/Agency/AddUser";
import EditAgencyProfile from "Views/Agency/EditAgencyProfile";
import LearnMore from "Views/Main/LearnMore";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jobs = useSelector((state) => state.jobs);
  const user = useSelector((state) => state.user);
  const loading = useSelector((state) => state.loader);
  const applicants = useSelector((state) => state.applicants);
  const [active, setActive] = useState(ApplicantTabOptions[0]);

  // useEffect(() => {
  //   // getJobs();
  //   // console.log("Jobs updated");
  //   console.log(window.sessionStorage.lastRoute);
  //   let redirectPath = window.sessionStorage.lastRoute?.replace(/\"/g, "");
  //   if (window.sessionStorage.lastRoute !== '"/"') {
  //     console.log("redirect");
  //     navigate(redirectPath);
  //   }
  //   window.onbeforeunload = () => {
  //     window.sessionStorage.setItem(
  //       "lastRoute",
  //       JSON.stringify(window.location.pathname)
  //     );
  //   };
  // }, []);

  async function getJobs() {
    const jobsCollection = collection(db, "jobs");
    const theJobs = await getDocs(jobsCollection)
      .then((response) => {
        const jobsArray = response.docs.map((doc) => ({
          ...doc.data(),
        }));
        // dispatch(loadJobs(jobsArray));
        // dispatch(setLoader(false));
        return jobsArray;
      })
      .catch((error) => console.log(error.message));
    // console.log(theJobs);
    dispatch(loadJobs(theJobs));
  }

  const slugify = (str) =>
    !!str &&
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  return (
    <div className="App">
      {loading && <Loading />}
      <SeafwaNav />
      {/* <NavBar /> */}
      {user.loggedIn && <h1 className="main-title">MINRC Job Portal</h1>}
      {user.loggedIn && (
        <NavTabs
          setActive={setActive}
          active={active}
          options={
            user?.agency === "applicant"
              ? ApplicantTabOptions
              : user?.agency === "MINRC Job Portal Admin"
              ? SuperTabOptions
              : AgencyTabOptions
          }
        />
      )}
      {
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route
            path="/applicant-home"
            element={<ApplicantHome getJobs={getJobs} />}
          ></Route>
          <Route
            path="/agency-home"
            element={<AgencyHome getJobs={getJobs} />}
          ></Route>
          <Route
            path="/super-home"
            element={<SuperHome getJobs={getJobs} />}
          ></Route>
          <Route path="/new-applicant" element={<ApplicantSignup />}></Route>
          <Route path="/new-agency" element={<AgencySignup />}></Route>
          <Route path="/apply-success" element={<ApplySuccess />}></Route>
          <Route path="/add-job" element={<AddJob />}></Route>
          <Route path="/view-applicants" element={<ViewApplicants />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route
            path="/applicant-profile"
            element={<ApplicantProfile />}
          ></Route>
          <Route path="/agency-profile" element={<AgencyProfile />}></Route>
          <Route
            path="/edit-agency-profile"
            element={<EditAgencyProfile user={user} />}
          ></Route>
          <Route path="/job-post-success" element={<JobPostSuccess />}></Route>
          <Route
            path="/user-signup-success"
            element={<AppSignupSuccess />}
          ></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/reset-password" element={<ResetPassword />}></Route>
          <Route path="/success-reset" element={<ResetSuccess />}></Route>
          <Route path="/add-user" element={<AddUser />}></Route>
          <Route path="/learn-more" element={<LearnMore />}></Route>

          {!!jobs &&
            jobs.map((job) => {
              const url = slugify(job.title + job.id);
              return (
                <Route
                  key={job.id}
                  path={`/${url}`}
                  element={<JobPost job={job} />}
                ></Route>
              );
            })}
          {!!jobs &&
            jobs.interest &&
            jobs.map((job) => {
              return job.interest.map((applicant) => {
                return (
                  <Route
                    key={applicant.id}
                    path={`/applicant-${slugify(applicant.id)}`}
                    element={<Applicant applicant={applicant} />}
                  ></Route>
                );
              });
            })}
          {!!jobs &&
            jobs.map((job) => {
              const url = slugify(job.title + job.id);
              return (
                <Route
                  key={job.id}
                  path={`/view-${url}`}
                  element={<JobPost job={job} />}
                ></Route>
              );
            })}
          {!!jobs &&
            jobs.map((job) => {
              const url = slugify(job.title + job.id);
              return (
                <Route
                  key={job.id}
                  path={`/edit-${url}`}
                  element={<EditJob job={job} />}
                ></Route>
              );
            })}
          {!!applicants &&
            applicants.map((applicant) => {
              const url = slugify(applicant.uid);
              return (
                <Route
                  key={applicant.uid}
                  path={`/applicant-${url}`}
                  element={<Applicant applicant={applicant} />}
                ></Route>
              );
            })}
          <Route
            path="/edit-profile"
            element={<EditApplicantProfile user={user} />}
          ></Route>
          {/* Default route to catch non-existent routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      }
      <SeafwaFooter />
    </div>
  );
}

export default App;
