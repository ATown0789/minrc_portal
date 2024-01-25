import React, { useState, useEffect } from "react";
import "./filterpanel.css";
import { stateOptions } from "./stateOptions";
import positionOptions from "../DUMMY_DATA/positionOptions";

import Select, { components } from "react-select";
import { MultiSelect } from "./MultiSelect";
import StarRating from "./StarRating";
import skills from "../DUMMY_DATA/skilloptions.json";
import aois from "../DUMMY_DATA/keywords.json";
import { IoLocationOutline } from "react-icons/io5";
import { PiBriefcaseMetalLight } from "react-icons/pi";
import { BsGearWideConnected } from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa6";
import { BsSearch } from "react-icons/bs";

const FilterPanel = ({
  filterObject,
  setFilterObject,
  setChangedFilter,
  rating,
  setRating,
  isApplicant,
  setSearchText,
}) => {
  const [hover, setHover] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const edOptions = [
    { value: "highschool", label: "Highschool" },
    { value: "undergraduate", label: "Undergraduate" },
    { value: "graduate", label: "Graduate School" },
  ];

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

  useEffect(() => {
    setFilterObject({ ...filterObject, matchRate: rating });
  }, [rating]);

  const Control = ({ children, ...props }) => {
    const style = { margin: "0", fontSize: "20px", color: "#c8b722" };

    return (
      <components.Control {...props}>
        <span style={style}>{<IoLocationOutline />}</span>
        {children}
      </components.Control>
    );
  };

  const styles = {
    control: (css) => ({
      ...css,
      paddingLeft: "5px",
      marginTop: "5px",
      zIndex: "9",
    }),
  };

  return (
    <div className="filter-panel">
      <span id="search-icon">
        <BsSearch />
      </span>
      <input
        className="search-input"
        placeholder={
          isApplicant
            ? `Find applicants by skill, interest, or state abbreviation`
            : `Find openings by location, agency, or keywords`
        }
        type="text"
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Select
        placeholder="Filter by state"
        components={{ Control }}
        options={stateOptions}
        onChange={(e) => {
          setChangedFilter("location");
          setFilterObject({ ...filterObject, location: e?.value });
        }}
        isClearable
        styles={styles}
      />

      {!isApplicant && (
        <label id="remote-label">
          <input
            id="remote-input"
            type="checkbox"
            checked={filterObject.remote}
            onChange={() => {
              setChangedFilter("remote");
              setFilterObject({
                ...filterObject,
                remote: !filterObject.remote,
              });
            }}
          />
          Remote
        </label>
      )}
      <MultiSelect
        placeholder="Filter by interest"
        icon={1}
        options={aois}
        value={filterObject.aois}
        onChange={(selectedOption) => {
          setChangedFilter("aois");
          let state;
          if (selectedOption) {
            state = selectedOption.map((selected) => ({
              ...selected,
            }));
          } else {
            state = null;
          }
          setFilterObject({ ...filterObject, aois: state });
        }}
      />

      <MultiSelect
        placeholder="Filter by skill"
        icon={2}
        options={skills}
        value={filterObject.skills}
        onChange={(selectedOption) => {
          setChangedFilter("skills");
          let state;
          if (selectedOption) {
            state = selectedOption.map((selected) => ({
              ...selected,
            }));
          } else {
            state = null;
          }
          setFilterObject({ ...filterObject, skills: state });
        }}
      />
      {isApplicant && (
        <>
          <Select
            placeholder="Filter by education"
            icon={3}
            options={edOptions}
            onChange={(e) => {
              setChangedFilter("location");
              setFilterObject({ ...filterObject, education: e?.label });
            }}
            isClearable
            styles={{ menu: (provided) => ({ ...provided, zIndex: 9 }) }}
          />
        </>
      )}
      {!isApplicant && (
        <>
          <p className="match-p">Match at least:</p>
          <StarRating
            rating={rating}
            setRating={setRating}
            hover={hover}
            setHover={setHover}
            setChangedFilter={setChangedFilter}
          />
          {!isMobile && (
            <span className="match-span">(double click to reset)</span>
          )}
        </>
      )}
    </div>
  );
};

export default FilterPanel;
