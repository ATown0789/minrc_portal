import React, { useEffect, useState } from "react";
import "./ApplicantHome.css";
import aois from "../../DUMMY_DATA/keywords.json";
import JobCard from "Components/JobCard";
import FilterPanel from "Components/FilterPanel";
import SearchPanel from "Components/SearchPanel";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoader } from "Redux/Loader/loaderSlice";
import * as BsIcons from "react-icons/bs";

const ApplicantHome = ({ getJobs }) => {
  const [filterObject, setFilterObject] = useState({
    location: "",
    remote: false,
    aois: [],
    skills: "",
    type: "",
    match: "",
    empty: true,
  });
  const navigate = useNavigate();
  const jobs = useSelector((state) => state.jobs);
  const user = useSelector((state) => state.user);
  const [rating, setRating] = useState(0);
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [changedFilter, setChangedFilter] = useState("");
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const isMobile = width <= 768;

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  if (!user.loggedIn) navigate("/");

  useEffect(() => {
    getJobs();
    setFilteredJobs(jobs);
    window.scrollTo({ top: 0, behavior: "instant" });
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  function toggleCard() {
    setIsExpanded(!isExpanded);
  }

  useEffect(() => {
    console.log(filterObject.empty);
    console.log(filterObject.skills);
  }, [filterObject]);

  useEffect(() => {
    setFilteredJobs(
      jobs.filter((job) => {
        if (
          !filterObject.location &&
          !filterObject.remote &&
          !filterObject.type &&
          filterObject.aois.length === 0 &&
          filterObject.skills.length === 0 &&
          rating === 0 &&
          searchText.length === 0
        ) {
          if (!filterObject.empty)
            setFilterObject({ ...filterObject, empty: true });
          return true;
        }

        if (filterObject.type) {
          if (!job.type.toLowerCase().includes(filterObject.type)) {
            return false;
          }
        }

        if (filterObject.remote) {
          let doesContain = false;
          if (filterObject.empty)
            setFilterObject({ ...filterObject, empty: false });
          if (job.remote === true) {
            doesContain = true;
          }
          if (!doesContain) return false;
        }

        if (filterObject.location) {
          let doesContain = false;
          if (filterObject.empty)
            setFilterObject({ ...filterObject, empty: false });
          job.location.forEach((location) => {
            if (location.value.includes(filterObject.location)) {
              doesContain = true;
            }
          });
          if (!doesContain) return false;
        }

        if (filterObject.aois.length > 0) {
          let doesContain = false;
          if (filterObject.empty)
            setFilterObject({ ...filterObject, empty: false });
          filterObject.aois.forEach((filterAoi) => {
            job.aois.forEach((jobAoi) => {
              if (jobAoi.value)
                if (
                  jobAoi.value
                    .toLowerCase()
                    .includes(filterAoi.value.toLowerCase())
                ) {
                  doesContain = true;
                }
            });
          });
          if (!doesContain) return false;
        }

        console.log(filterObject);

        if (filterObject.skills.length > 0) {
          let doesContain = false;
          if (filterObject.empty)
            setFilterObject({ ...filterObject, empty: false });
          filterObject.skills.forEach((filterSkill) => {
            job.skills.forEach((jobSkill) => {
              if (jobSkill.value)
                if (
                  jobSkill.value
                    .toLowerCase()
                    .includes(filterSkill.value.toLowerCase())
                ) {
                  doesContain = true;
                }
            });
          });
          if (!doesContain) return false;
        }

        if (rating > 0) {
          if (job.match < rating) {
            if (filterObject.empty)
              setFilterObject({ ...filterObject, empty: false });
            return false;
          }
        }

        if (searchText.length > 0) {
          let doesContain = false;
          if (filterObject.empty)
            setFilterObject({ ...filterObject, empty: false });
          if (
            job.title.toLowerCase().includes(searchText.toLowerCase()) ||
            job.agency.toLowerCase().includes(searchText.toLowerCase()) ||
            job.type.toLowerCase().includes(searchText.toLowerCase()) ||
            job.location.forEach((location) => {
              if (
                location.label.toLowerCase().includes(searchText.toLowerCase())
              ) {
                doesContain = true;
              }
              if (!doesContain) return false;
            }) ||
            job.aois.forEach((aoi) => {
              if (aoi.value.toLowerCase().includes(searchText.toLowerCase())) {
                doesContain = true;
              }
              if (!doesContain) return false;
            })
          )
            doesContain = true;

          if (!doesContain) return false;
        }

        return true;
      })
    );
  }, [filterObject, searchText]);

  useEffect(() => {
    if (jobs.length > 0) setTimeout(() => dispatch(setLoader(false)), 1000);
  }, [jobs]);

  return user.loggedIn ? (
    <>
      <h1>MINRC Job Board</h1>
      <div className="job-wrap">
        <SearchPanel
          filteredJobs={filteredJobs}
          setFilteredJobs={setFilteredJobs}
          searchText={searchText}
          setSearchText={setSearchText}
        />
        <div className="job-view">
          <div
            className={
              isExpanded ? "show-full filter-container" : "filter-container"
            }
          >
            <FilterPanel
              filterObject={filterObject}
              setFilterObject={setFilterObject}
              setChangedFilter={setChangedFilter}
              rating={rating}
              setRating={setRating}
            />
            {isMobile && (
              <span
                onClick={toggleCard}
                className={isExpanded ? "expanded chevron" : "chevron"}
                style={{ fontSize: "24px", justifySelf: "flex-end" }}
              >
                <BsIcons.BsChevronCompactDown />
              </span>
            )}
          </div>
          <div className="job-container">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => {
                return <JobCard key={job.id} job={job} user={user} />;
              })
            ) : filteredJobs.length === 0 && !filterObject.empty ? (
              <div>
                <h3>
                  No jobs match current filters. Please adjust filters to view
                  more matches
                </h3>
              </div>
            ) : (
              jobs.map((job) => {
                return <JobCard key={job.id} job={job} user={user} />;
              })
            )}
          </div>
        </div>
      </div>
    </>
  ) : (
    <div> YOU'RE NOT LOGGED IN! </div>
  );
};

export default ApplicantHome;
