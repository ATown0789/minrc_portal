import React from "react";
import skilloptions from "../../DUMMY_DATA/skilloptions.json";
import keywords from "../../DUMMY_DATA/keywords.json";
import { stateOptions } from "Components/stateOptions";
import "./applicantsignup.css";
import { auth, registerWithEmailAndPassword } from "firebase.config";
import { Link, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import {
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

const ApplicantSignup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const edOptions = [
    { value: "highschool", label: "Highschool" },
    { value: "undergraduate", label: "Undergraduate" },
    { value: "graduate", label: "Graduate School" },
  ];

  const registerApplicant = async (registrant) => {
    const response = await registerWithEmailAndPassword(registrant);
    return response;
  };

  const methods = useForm();
  const control = methods.control;
  const errors = methods.formState.errors;

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
    registerApplicant(registrant).then((response) => {
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

    // dispatch(addJob({ ...job, id: newJobID }));

    // navigate("/job-post-success");
  });

  return (
    <div className="applicant-form-container">
      <div>
        <h1 className="signup-h1">Applicant Registration</h1>
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
          <Input {...emailValidation} />
          <Input {...passwordValidation} />
          <Input {...minrcYearValidation} />
          <Input
            {...applicantLocationValidation}
            control={control}
            options={stateOptions}
          />
          <Input
            {...educationValidation}
            control={control}
            options={edOptions}
          />
          <Input
            {...applicantSkillsValidation}
            control={control}
            options={skilloptions}
          />
          <Input
            {...applicantAoisValidation}
            control={control}
            options={keywords}
          />
          <Input {...professionalSummaryValidation} />

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

export default ApplicantSignup;
