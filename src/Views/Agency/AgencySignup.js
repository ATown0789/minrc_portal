import React, { useEffect, useState } from "react";
import Select from "react-select";
import { MultiSelect } from "Components/MultiSelect";
import skilloptions from "../../DUMMY_DATA/skilloptions.json";
import keywords from "../../DUMMY_DATA/keywords.json";
import { stateOptions } from "Components/stateOptions";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "firebase.config";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { FormProvider, useForm } from "react-hook-form";
import "./agencysignup.css";
import {
  agencyEmailValidation,
  agencyLocationValidation,
  agencyNameValidation,
  applicantAoisValidation,
  applicantLocationValidation,
  applicantSkillsValidation,
  educationValidation,
  emailValidation,
  fNameValidation,
  lNameValidation,
  minrcYearValidation,
  passwordValidation,
  professionalSummaryValidation,
} from "utils/inputValidations";
import { Input } from "Components/Input";
import { useDispatch } from "react-redux";
import { setLoader } from "Redux/Loader/loaderSlice";

const AgencySignup = () => {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [agency, setAgency] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stateSel, setStateSel] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const authType = "agency";
  const dispatch = useDispatch();
  const edOptions = [
    { value: "highschool", label: "Highschool" },
    { value: "undergraduate", label: "Undergraduate" },
    { value: "graduate", label: "Graduate School" },
  ];
  const methods = useForm();
  const control = methods.control;
  const errors = methods.formState.errors;

  let minrcYear, education, skills, interests, summary;

  const register = (e) => {
    e.preventDefault();
    registerWithEmailAndPassword(
      fName,
      email,
      password,
      lName,
      minrcYear,
      education,
      skills,
      stateSel,
      interests,
      summary,
      agency,
      authType
    );
    setSubmitted(true);
    setTimeout(() => navigate("/"), 3000);
  };

  const onSubmit = methods.handleSubmit(async (data) => {
    dispatch(setLoader(true));
    let registrant = {
      email: data.email,
      password: data.password,
      fname: data.fName,
      lName: data.lName,
      minrcYear: data.minrcYear,
      education: data.education.label,
      skills: data.applicantSkills,
      stateSel: data.location.value,
      interests: data.applicantAois,
      summary: data.professionalSummary
        .split("\n")
        .filter((str) => str.trim() !== ""),
      agency: "applicant",
    };
    console.log(registrant);
    // registerApplicant(registrant).then((response) => {
    //   console.log(response);
    //   if (response === true) {
    //     setTimeout(() => {
    //       dispatch(setLoader(false));
    //       navigate("/applicant-signup-success");
    //     }, 2000);
    //   } else {
    //     alert(response);
    //     dispatch(setLoader(false));
    //   }
    // });

    // dispatch(addJob({ ...job, id: newJobID }));

    // navigate("/job-post-success");
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fName === "" || lName === "" || email === "" || password === "") {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
    }
  };

  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h1
          style={{
            color: "green",
            textAlign: "center",
          }}
        >
          Agency "{agency}" successfully registered!!
        </h1>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

  return (
    <div className="applicant-form-container">
      <div>
        <h1 className="signup-h1">Agency Registration</h1>
      </div>

      {/* <form onSubmit={register} className="new-applicant-form">
        <label className="label">
          First Name
          <input
            onChange={(e) => {
              setFName(e.target.value);
            }}
            className="input"
            value={fName}
            type="text"
            placeholder="Full name"
          />
        </label>
        <label className="label">
          Last Name
          <input
            onChange={(e) => {
              setLName(e.target.value);
            }}
            className="input"
            value={lName}
            type="text"
            placeholder="Full name"
          />
        </label>

        <label className="label">
          Agency Name
          <input
            onChange={(e) => {
              setAgency(e.target.value);
            }}
            className="input"
            value={agency}
            type="text"
            placeholder="Agency name"
          />
        </label>

        <label className="label">
          Agency Contact Email
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="input"
            value={email}
            type="email"
            placeholder="Best email address"
          />
        </label>

        <label className="label">
          Password
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="input"
            value={password}
            type="password"
            placeholder="Password"
          />
        </label>

        <label className="label">
          Location
          <Select
            className="select-input"
            placeholder="Select a state"
            options={stateOptions}
            onChange={(e) => {
              setStateSel(e.value);
            }}
          />
        </label>

        <button className="submit-btn" type="submit">
          Submit
        </button>
      </form> */}

      <FormProvider {...methods}>
        <form
          onSubmit={(e) => e.preventDefault()}
          noValidate
          autoComplete="off"
          className="new-applicant-form"
        >
          <Input {...fNameValidation} />
          <Input {...lNameValidation} />
          <Input {...agencyNameValidation} />
          <Input {...emailValidation} />
          <Input {...passwordValidation} />
          <Input {...agencyEmailValidation} />
          <Input
            {...agencyLocationValidation}
            control={control}
            options={stateOptions}
          />

          <button onClick={onSubmit} className="submit-btn" type="submit">
            Register
          </button>

          <div className="login-text">
            Already have an account? <Link to="/">Login</Link> now.
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AgencySignup;
