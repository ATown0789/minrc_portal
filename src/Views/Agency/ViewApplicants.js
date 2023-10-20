import React, { useEffect, useState } from "react";
import NavBar from "Components/NavBar";
import data from "../../DUMMY_DATA/applicantdata.json";
import FilterPanel from "Components/FilterPanel";
import SearchPanel from "Components/SearchPanel";
import { useSelector, useDispatch } from "react-redux";
import ApplicantCard from "Components/ApplicantCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "firebase.config";

const ViewApplicants = () => {
  const dispatch = useDispatch();
  const [filterObject, setFilterObject] = useState({
    location: "",
    remote: false,
    keywords: [],
    related: "",
    type: "",
    match: "",
  });
  const applicants = useSelector((state) => state.applicants);

  const getFilteredItems = (query, items) => {
    if (!query) {
      return items;
    }
    return items.filter((song) => song.name.includes(query));
  };

  return (
    <>
      <h1>MINRC applicant Board</h1>
      <div className="job-wrap">
        <SearchPanel getFilteredItems={getFilteredItems} />
        <div className="job-view">
          <div className="job-container">
            {applicants.map((applicant) => {
              return (
                <ApplicantCard key={applicant.uid} applicant={applicant} />
              );
            })}
          </div>
          <div className="filter-container">
            <FilterPanel
              filterObject={filterObject}
              setFilterObject={setFilterObject}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewApplicants;
