import React from "react";

function JobForm() {
  const [responsibility, setResponsibility] = useState("");
  const [description, setDescription] = useState("");
  const [agency, setAgency] = useState("");
  const [type, setType] = useState("");
  const [website, setWebsite] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [stateSel, setStateSel] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState("");
  const [responsibilitesList, setResponsibilitiesList] = useState([""]);

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleTitle = (e) => {
    setTitle(e.target.value);
    setSubmitted(false);
  };

  const handleAgency = (e) => {
    setAgency(e.target.value);
    setSubmitted(false);
  };

  const handleSalary = (e) => {
    setSalary(e.target.value);
    setSubmitted(false);
  };

  const handleDate = (e) => {
    setDate(e.target.value);
    setSubmitted(false);
  };

  const handleStart = (e) => {
    setStartDate(e.target.value);
    setSubmitted(false);
  };

  const handleEnd = (e) => {
    setEndDate(e.target.value);
    setSubmitted(false);
  };

  const handleSummary = (e) => {
    setSummary(e.target.value);
    setSubmitted(false);
  };

  const handleQualify = (e) => {
    setQualify(e.target.value);
    setSubmitted(false);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
    setSubmitted(false);
  };

  const handleWebsite = (e) => {
    setWebsite(e.target.value);
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "" || date === "" || summary === "") {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
    }
  };

  return (
    <form className="new-job-form">
      <label className="label">
        Title
        <input
          onChange={handleTitle}
          className="input"
          value={title}
          type="text"
          placeholder="Title name"
        />
      </label>
      <label className="label">
        Application Due Date
        <input
          onChange={handleDate}
          className="input"
          value={date}
          type="date"
        />
      </label>
      <label className="label">
        Summary
        <textarea
          onChange={handleSummary}
          className="input"
          value={summary}
          maxLength="140"
          cols="40"
          placeholder="Position summary"
        />
      </label>
      <label className="label">
        Locations
        <div className="signup-multiselect">
          <MultiSelect
            placeholder="Locations position is available"
            options={stateOptions}
            value={stateSel}
            onChange={(selectedOption) => {
              let state;
              if (selectedOption) {
                state = selectedOption.map((selected) => ({
                  ...selected,
                }));
              } else {
                state = null;
              }
              setStateSel(state);
            }}
          />
        </div>
      </label>
      <label className="label">
        Keywords
        <div className="signup-multiselect">
          <MultiSelect
            placeholder="Select keywords"
            options={keywords}
            value={selectedKeywords}
            onChange={(selectedOption) => {
              let state;
              if (selectedOption) {
                state = selectedOption.map((selected) => ({
                  ...selected,
                }));
              } else {
                state = null;
              }
              setSelectedKeywords(state);
            }}
          />
        </div>
      </label>
      <label className="label">
        Employment Type
        <Select
          className="select-input"
          placeholder="Select type"
          options={[
            { value: "part", label: "Part Time" },
            { value: "full", label: "Full Time" },
            { value: "intern", label: "Internship" },
          ]}
          onChange={(e) => {
            setType(e.value);
          }}
        />
      </label>
      <label className="label">
        Agency
        <input
          onChange={handleAgency}
          className="input"
          value={agency}
          type="text"
          placeholder="Hiring agency"
        />
      </label>
      <label className="label">
        Salary
        <input
          onChange={handleSalary}
          className="input"
          value={salary}
          type="text"
          placeholder="Enter position salary"
        />
      </label>
      <label className="label">
        Position Start Date
        <input
          onChange={handleStart}
          className="input"
          value={startDate}
          type="date"
        />
      </label>
      <label className="label">
        Position End Date
        <input
          onChange={handleEnd}
          className="input"
          value={endDate}
          type="date"
        />
      </label>
      <label className="label">
        Position Description
        <textarea
          onChange={handleDescription}
          className="text-input"
          value={description}
          rows="8"
          cols="35"
          maxLength="600"
          placeholder="Full position description"
        />
      </label>

      {responsibilitesList.map((respo, index) => (
        <Respo respo={respo} key={index} index={index} />
      ))}

      <label className="label">
        Qualifications
        <textarea
          onChange={handleQualify}
          className="text-input"
          value={qualify}
          maxLength="140"
          cols="35"
          placeholder="Required Qualifications"
        />
      </label>
      <label className="label">
        Website
        <input
          onChange={handleWebsite}
          className="input"
          value={website}
          type="website"
          placeholder="Website for more info"
        />
      </label>
      <button onClick={handleSubmit} className="submit-btn" type="submit">
        Submit
      </button>
    </form>
  );
}

export default JobForm;
