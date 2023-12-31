import { useEffect, useState } from "react";
import "./searchpanel.css";
import * as BsIcons from "react-icons/bs";

export default function SearchPanel({
  filteredJobs,
  setFilteredJobs,
  searchText,
  setSearchText,
  isApplicant,
}) {
  useEffect(() => {}, [searchText]);

  return (
    <div className="search-panel">
      <label className="search-label">Quick Search</label>
      <input
        className="search-input"
        placeholder={
          isApplicant
            ? "Find applicants by skill, interest, or state abbreviation"
            : "Find openings by location, agency, or keywords"
        }
        type="text"
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
}
