import React, { useEffect, useState } from "react";
import { stateOptions } from "Components/stateOptions";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "firebase.config";
import { Link, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import "./agencysignup.css";
import {
  agencyEmailValidation,
  agencyLocationValidation,
  agencyNameValidation,
  fNameValidation,
  lNameValidation,
  passwordValidation,
} from "utils/inputValidations";
import { Input } from "Components/Input";
import { useDispatch } from "react-redux";
import { setLoader } from "Redux/Loader/loaderSlice";

const AgencySignup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const methods = useForm();
  const control = methods.control;
  const errors = methods.formState.errors;

  const registerAgency = async (agency) => {
    const response = await registerWithEmailAndPassword(agency);
    return response;
  };

  const onSubmit = methods.handleSubmit(async (data) => {
    dispatch(setLoader(true));
    let agency = {
      email: data.agencyEmail,
      password: data.password,
      fname: data.fName,
      lName: data.lName,
      stateSel: data.location.value,
      agency: data.agencyName,
    };
    console.log(agency);
    registerAgency(agency).then((response) => {
      console.log(response);
      if (response === true) {
        setTimeout(() => {
          dispatch(setLoader(false));
          navigate("/applicant-signup-success");
        }, 2000);
      } else {
        alert(response);
        dispatch(setLoader(false));
      }
    });
  });

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
          <Input {...agencyEmailValidation} />
          <Input {...passwordValidation} />
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
