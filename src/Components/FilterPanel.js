import React, { useState, useEffect } from "react";
import "./filterpanel.css";
import { stateOptions } from "./stateOptions";
import positionOptions from "../DUMMY_DATA/positionOptions";
import Select from "react-select";
import { MultiSelect } from "./MultiSelect";
import StarRating from "./StarRating";

import aois from "../DUMMY_DATA/keywords.json";

const FilterPanel = ({
  filterObject,
  setFilterObject,
  setChangedFilter,
  rating,
  setRating,
}) => {
  const [hover, setHover] = useState(0);
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

  useEffect(() => {
    setFilterObject({ ...filterObject, matchRate: rating });
  }, [rating]);

  return (
    <div className="filter-panel">
      <h2>Filters</h2>
      <h4>Match:</h4>
      <StarRating
        rating={rating}
        setRating={setRating}
        hover={hover}
        setHover={setHover}
        setChangedFilter={setChangedFilter}
      />
      {!isMobile && <span className="match-span">(double click to reset)</span>}
      <hr />
      <h4>Location:</h4>
      <Select
        placeholder="Select a state"
        options={stateOptions}
        onChange={(e) => {
          setChangedFilter("location");
          setFilterObject({ ...filterObject, location: e?.value });
        }}
        isClearable
        styles={{ menu: (provided) => ({ ...provided, zIndex: 9 }) }}
      />
      <label>
        <input
          id="remote-input"
          type="checkbox"
          checked={filterObject.remote}
          onChange={() => {
            setChangedFilter("remote");
            setFilterObject({ ...filterObject, remote: !filterObject.remote });
          }}
        />
        Remote
      </label>
      <hr />
      <h4>Areas of Interest:</h4>
      <MultiSelect
        placeholder="Select areas of interest"
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
      <hr />
      <h4>Position Type:</h4>
      <Select
        placeholder="Select a type"
        styles={{ menu: (provided) => ({ ...provided, zIndex: 9 }) }}
        options={positionOptions}
        onChange={(e) => {
          setChangedFilter("type");
          setFilterObject({ ...filterObject, type: e?.value });
        }}
        isClearable
      />
    </div>
  );
};

export default FilterPanel;
