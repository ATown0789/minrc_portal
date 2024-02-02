import React, { useEffect, useState } from "react";
import skilloptions from "../../DUMMY_DATA/skilloptions.json";
import keywords from "../../DUMMY_DATA/keywords.json";
import { stateOptions } from "Components/stateOptions";
import { updateUser } from "firebase.config";
import { useNavigate } from "react-router-dom";
import { editUser } from "Redux/User/userSlice";
import { useDispatch } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import {
  agencyEmailValidation,
  agencyLocationValidation,
  passwordValidation,
  agencyNameValidation,
  fNameValidation,
  lNameValidation,
} from "utils/inputValidations";
import { Input } from "Components/Input";
import { setLoader } from "Redux/Loader/loaderSlice";
import Button from "Components/Button";
import Modal from "Components/Modal";
const EditAgencyProfile = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalToggle, setModalToggle] = useState(false);

  const stateSelFunction = (state) => {
    const stateIndex = stateOptions.findIndex(
      (stateOpt) => stateOpt.value === state
    );
    return stateOptions[stateIndex];
  };

  const defaultFormValues = {
    ...user,
    agencyName: user.agency,
    agencyEmail: user.email,
    location: stateSelFunction(user.stateSel),
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

  // const onSubmit = methods.handleSubmit(async (data) => {
  //   dispatch(setLoader(true));
  //   let registrant = {
  //     ...user,
  //     fName: data.fName,
  //     lName: data.lName,
  //     minrcYear: data.minrcYear,
  //     education: data.education.label,
  //     skills: data.applicantSkills,
  //     stateSel: data.location.value,
  //     interests: data.applicantAois,
  //     summary: data.professionalSummary
  //       .split("\n")
  //       .filter((str) => str.trim() !== ""),
  //     agency: "applicant",
  //   };
  //   console.log(registrant);
  //   updateUser(registrant);
  //   dispatch(editUser(registrant));
  //   navigate("/applicant-profile");
  // });

  const onSubmit = methods.handleSubmit(async (data) => {
    dispatch(setLoader(true));
    let agency = {
      docId: user.docId,
      email: data.agencyEmail,
      fName: data.fName,
      lName: data.lName,
      stateSel: data.location.value,
      agency: data.agencyName,
    };
    updateUser(agency);
    dispatch(editUser(agency));
    navigate("/agency-profile");
  });

  return (
    <>
      {modalToggle && (
        <Modal
          modalToggle={modalToggle}
          setModalToggle={setModalToggle}
          type={"forgotPass"}
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

            <Input
              {...agencyLocationValidation}
              control={control}
              options={stateOptions}
            />

            <Button onClick={onSubmit} className="primary small" type="submit">
              Update Profile
            </Button>
          </form>
        </FormProvider>
      </div>
    </>
  );
};
export default EditAgencyProfile;
