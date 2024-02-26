import React, { useEffect, useState } from "react";
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
import Button from "Components/Button";
import Modal from "Components/Modal";
import { IoArrowBack } from "react-icons/io5";

const EditApplicantProfile = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalToggle, setModalToggle] = useState(false);

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

  const defaultFormValues = !user.education
    ? { ...user }
    : {
        ...user,
        applicantAois: user.interests,
        applicantSkills: user.skills,
        professionalSummary: user.summary ? user.summary.join("\n\n") : "",
        location: stateSelFunction(user.stateSel),
        education: educationFunction(user.education),
      };

  const methods = useForm({
    defaultValues: defaultFormValues,
  });
  const control = methods.control;
  const errors = methods.formState.errors;

  useEffect(() => {
    if (!user.loggedIn) navigate("/");
    setTimeout(() => dispatch(setLoader(false)), 1000);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const onSubmit = methods.handleSubmit(async (data) => {
    dispatch(setLoader(true));
    let registrant = {
      ...user,
      fName: data.fName,
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
    updateUser(registrant);
    dispatch(editUser(registrant));
    navigate("/applicant-profile");
  });

  return (
    <>
      {modalToggle && (
        <Modal
          modalToggle={modalToggle}
          setModalToggle={setModalToggle}
          type={"resetPassword"}
        />
      )}
      <div className="tab-content">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1 className="signup-h1">Edit Profile</h1>
          <Button
            onClick={() => setModalToggle(true)}
            style={{ height: "40px" }}
            variant="delete primary"
          >
            Reset Password
          </Button>
        </div>
        {!user?.education && (
          <p style={{ fontWeight: "bold", color: "red" }}>
            Please complete your profile in its entirety before continuing.
          </p>
        )}
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

            <div style={{ marginTop: "30px" }} className="btn-container">
              {/* <Button
                type="button"
                onClick={() => {
                  const values = methods.getValues();
                  // navigate("/applicant-profile");
                  if (
                    !values.applicantAois &&
                    !values.applicantSkills &&
                    !values.education &&
                    !values.fName &&
                    !values.lName &&
                    !values.locaiton &&
                    !values.minrcYear &&
                    !values.professionalSummar
                  ) {
                    navigate("/applicant-profile");
                    console.log(values);
                  } else
                    alert(
                      "Please fill out all form fields to continue or logout to exit"
                    );
                }}
                className="primary secondary"
              >
                Cancel
              </Button> */}

              <Button
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "200px",
                }}
                className="primary secondary"
                onClick={() => navigate(-1)}
              >
                <IoArrowBack style={{ marginRight: "5px" }} /> Cancel
              </Button>

              <Button
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "200px",
                }}
                onClick={onSubmit}
                className="primary"
                type="submit"
              >
                Update Profile
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};
export default EditApplicantProfile;
