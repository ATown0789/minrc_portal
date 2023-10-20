import React, { useEffect } from "react";
import skilloptions from "../../DUMMY_DATA/skilloptions.json";
import keywords from "../../DUMMY_DATA/keywords.json";
import { stateOptions } from "Components/stateOptions";
import "./applicantsignup.css";
import { updateUser } from "firebase.config";
import { useNavigate } from "react-router-dom";
import { editUser } from "Redux/User/userSlice";
import { useDispatch } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import {
  applicantAoisValidation,
  applicantLocationValidation,
  applicantSkillsValidation,
  educationValidation,
  fNameValidation,
  lNameValidation,
  minrcYearValidation,
  professionalSummaryValidation,
} from "utils/inputValidations";
import { Input } from "Components/Input";
import { setLoader } from "Redux/Loader/loaderSlice";

const EditApplicantProfile = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const edOptions = [
    {
      value: "",
      label: "Select education",
    },
    { value: "highschool", label: "Highschool" },
    { value: "undergraduate", label: "Undergraduate" },
    { value: "graduate", label: "Graduate School" },
  ];

  const stateSelFunction = (state) => {
    const stateIndex = stateOptions.findIndex(
      (stateOpt) => stateOpt.value === state
    );
    return stateOptions[stateIndex];
  };

  const educationFunction = (education) => {
    switch (education) {
      case "Highschool":
        return edOptions[1];
        break;
      case "Undergraduate":
        return edOptions[2];
        break;
      case "Graduate School":
        return edOptions[3];
        break;
      default:
        return edOptions[0];
    }
  };

  const methods = useForm({
    defaultValues: {
      ...user,
      applicantAois: user.interests,
      applicantSkills: user.skills,
      professionalSummary: user.summary.join("\n\n"),
      location: stateSelFunction(user.stateSel),
      education: educationFunction(user.education),
    },
  });
  const control = methods.control;
  const errors = methods.formState.errors;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const onSubmit = methods.handleSubmit(async (data) => {
    dispatch(setLoader(true));
    let registrant = {
      ...user,
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
    updateUser(registrant);
    dispatch(editUser(registrant));
    navigate("/applicant-profile");
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

          <div className="btn-container">
            <button
              onClick={() => {
                navigate("/applicant-profile");
              }}
              className="cancel-btn"
            >
              Cancel
            </button>

            <button onClick={onSubmit} className="submit-btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
export default EditApplicantProfile;
