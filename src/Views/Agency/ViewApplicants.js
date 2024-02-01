import React, { useEffect, useState } from "react";
import NavBar from "Components/NavBar";
import data from "../../DUMMY_DATA/applicantdata.json";
import FilterPanel from "Components/FilterPanel";
import { useSelector, useDispatch } from "react-redux";
import ApplicantCard from "Components/ApplicantCard";
import "../../Components/filterpanel.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "firebase.config";
import * as BsIcons from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const ViewApplicants = () => {
  const dispatch = useDispatch();
  const [filterObject, setFilterObject] = useState({
    location: "",
    remote: false,
    keywords: [],
    related: "",
    type: "",
    match: "",
    education: "",
  });
  const applicants = useSelector((state) => state.applicants);
  const [rating, setRating] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [filteredApplicants, setFilteredApplicants] = useState(applicants);
  const [width, setWidth] = useState(window.innerWidth);
  const [isExpanded, setIsExpanded] = useState(false);
  const [changedFilter, setChangedFilter] = useState("");

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
    if (!user.loggedIn) navigate("/");
  }, []);

  function toggleCard() {
    setIsExpanded(!isExpanded);
  }

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

  console.log(filteredApplicants.map((applicant) => applicant));

  useEffect(() => {
    setFilteredApplicants(
      applicants.filter((applicant) => {
        if (
          !filterObject.location &&
          !filterObject.type &&
          filterObject.aois?.length === 0 &&
          filterObject.skills?.length === 0 &&
          !filterObject.education &&
          searchText.length === 0
        )
          return true;

        if (filterObject.location) {
          let doesContain = false;

          if (applicant.stateSel.includes(filterObject.location)) {
            doesContain = true;
          }

          if (!doesContain) return false;
        }

        if (filterObject.education) {
          let doesContain = false;

          if (applicant.education.includes(filterObject.education)) {
            doesContain = true;
          }

          if (!doesContain) return false;
        }

        if (filterObject.aois?.length > 0) {
          let doesContain = false;
          filterObject.aois.forEach((filterAoi) => {
            applicant.interests.forEach((applicantAoi) => {
              if (applicantAoi.value)
                if (
                  applicantAoi.value
                    .toLowerCase()
                    .includes(filterAoi.value.toLowerCase())
                ) {
                  doesContain = true;
                }
            });
          });
          if (!doesContain) return false;
        }

        if (filterObject.skills?.length > 0) {
          let doesContain = false;
          filterObject.skills.forEach((filterSkill) => {
            applicant.skills.forEach((applicantSkill) => {
              if (applicantSkill.value)
                if (
                  applicantSkill.value
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
          if (applicant.match < rating) return false;
        }

        if (searchText.length > 0) {
          let doesContain = false;
          if (
            applicant.stateSel
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            applicant.interests.forEach((aoi) => {
              if (aoi.value.toLowerCase().includes(searchText.toLowerCase())) {
                doesContain = true;
              }
              if (!doesContain) return false;
            }) ||
            applicant.skills.forEach((skill) => {
              if (
                skill.value.toLowerCase().includes(searchText.toLowerCase())
              ) {
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

  return (
    <div className="tab-content">
      <h1>MINRC applicant Board</h1>
      <div className="job-wrap">
        <div className="filter-container">
          <FilterPanel
            id="applicant-filter"
            filterObject={filterObject}
            setFilterObject={setFilterObject}
            setChangedFilter={setChangedFilter}
            rating={rating}
            setRating={setRating}
            isApplicant={true}
          />
        </div>
        <div className="job-container">
          {filteredApplicants.map((applicant) => {
            return <ApplicantCard key={applicant.uid} applicant={applicant} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ViewApplicants;
