import { useEffect, useState } from "react";
import "./searchpanel.css";
import { BsSearch } from "react-icons/bs";

export default function SearchPanel({
  filteredJobs,
  setFilteredJobs,
  searchText,
  setSearchText,
  isApplicant,
}) {
  useEffect(() => {}, [searchText]);

  return <div className="search-panel"></div>;
}
