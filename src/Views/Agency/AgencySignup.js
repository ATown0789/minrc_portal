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
import Button from "Components/Button";

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
      fName: data.fName,
      lName: data.lName,
      stateSel: data.location.value,
      agency: data.agencyName,
    };
    registerAgency(agency).then((response) => {
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

          <Button onClick={onSubmit} className="primary" type="submit">
            Register
          </Button>

          <div className="login-text">
            Already have an account? <Link to="/">Login</Link> now.
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AgencySignup;
