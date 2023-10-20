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

const ApplicantHome = () => {
  const [filterObject, setFilterObject] = useState({
    location: "",
    remote: false,
    aois: [],
    related: "",
    type: "",
    match: "",
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

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  console.log(isMobile);

  function toggleCard() {
    setIsExpanded(!isExpanded);
  }
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setTimeout(() => dispatch(setLoader(false)), 1000);
  }, []);

  useEffect(() => {
    if (!user.loggedIn) navigate("/");
  }, []);

  useEffect(() => {
    setFilteredJobs(
      jobs.filter((job) => {
        if (
          !filterObject.location &&
          !filterObject.remote &&
          !filterObject.type &&
          filterObject.aois.length === 0 &&
          rating === 0 &&
          searchText.length === 0
        )
          return true;

        if (filterObject.type) {
          if (!job.type.toLowerCase().includes(filterObject.type)) {
            return false;
          }
        }

        if (filterObject.remote) {
          let doesContain = false;

          if (job.remote === true) {
            doesContain = true;
          }
          if (!doesContain) return false;
        }

        if (filterObject.location) {
          let doesContain = false;
          job.location.forEach((location) => {
            if (location.value.includes(filterObject.location)) {
              doesContain = true;
            }
          });
          if (!doesContain) return false;
        }

        if (filterObject.aois.length > 0) {
          let doesContain = false;
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

        if (rating > 0) {
          if (job.match < rating) return false;
        }

        if (searchText.length > 0) {
          let doesContain = false;
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
            {filteredJobs.map((job) => {
              return <JobCard key={job.id} job={job} user={user} />;
            })}
          </div>
        </div>
      </div>
    </>
  ) : (
    <div> YOU'RE NOT LOGGED IN! </div>
  );
};

export default ApplicantHome;
