import React, { useEffect } from "react";
import skilloptions from "../../DUMMY_DATA/skilloptions.json";
import keywords from "../../DUMMY_DATA/keywords.json";
import { stateOptions } from "Components/stateOptions";
import { auth, registerWithEmailAndPassword } from "firebase.config";
import { Link, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import {
  newUserEmailValidation,
  newUserFNameValidation,
  newUserLNameValidation,
  newUserPasswordValidation,
} from "utils/inputValidations";
import { Input } from "Components/Input";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "Redux/Loader/loaderSlice";
import Button from "Components/Button";
import emailjs, { send } from "@emailjs/browser";

const AddUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const edOptions = [
    { value: "highschool", label: "Highschool" },
    { value: "undergraduate", label: "Undergraduate" },
    { value: "graduate", label: "Graduate School" },
  ];

  const registerApplicant = async (registrant) => {
    const response = await registerWithEmailAndPassword(registrant);
    return response;
  };

  const sendEmail = (templateParams) => {
    emailjs
      .send(
        "service_8ocr1xq",
        "template_1t2yqye",
        templateParams,
        "up-OCrc-irKkF1wm_"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const methods = useForm();
  const control = methods.control;
  const errors = methods.formState.errors;

  const onSubmit = methods.handleSubmit(async (data) => {
    dispatch(setLoader(true));

    const newUserTemplateParams = {
      agency: user.agency,
      from_email: "noreply@mg.minrcportal.com",
      to_email: data.email,
      from_name: user.agency,
      to_name: data.fName,
      subject: "MINRC Job Portal Registration",
      reply_to: !!user.email ? user.email : "noreply@mg.minrcportal.com",
      message1: `Thank you for being a part of MINRC`,
      message2: `One of the many benifits of being a member of MINRC is access to our job portal. Please go to www.minrcportal.com/ to log in and get started.`,
      message3: `Your username is your email (${data.email}) and your temporary password is ${data.password}. For your security your password and profile should be updated upon your first login.`,
      message4: `If you would like more information, or believe you got this messgae in errer please contact us at ${user.email}.`,
    };

    let registrant = {
      email: data.email,
      password: data.password,
      fName: data.fName,
      lName: data.lName,
      //   minrcYear: data.minrcYear,
      //   education: data.education.label,
      //   skills: data.applicantSkills,
      //   stateSel: data.location.value,
      //   interests: data.applicantAois,
      //   summary: data.professionalSummary
      //     .split("\n")
      //     .filter((str) => str.trim() !== ""),
      agency: "applicant",
    };
    console.log(registrant);
    registerApplicant(registrant).then((response) => {
      console.log(response);
      if (response === true) {
        sendEmail(newUserTemplateParams);
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

  useEffect(() => {
    console.log(user);
    setTimeout(() => dispatch(setLoader(false)), 1000);
  }, []);

  return (
    <div className="tab-content">
      <div className="applicant-form-container">
        <div>
          <h1 className="signup-h1">Add Applicant User</h1>
        </div>
        <FormProvider {...methods}>
          <form
            onSubmit={(e) => e.preventDefault()}
            noValidate
            autoComplete="off"
            className="new-applicant-form"
          >
            <Input autoComplete="off" {...newUserFNameValidation} />
            <Input autoComplete="off" {...newUserLNameValidation} />
            <Input autoComplete="off" {...newUserEmailValidation} />
            <Input autoComplete="off" {...newUserPasswordValidation} />
            {/* <Input {...minrcYearValidation} />
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
            <Input {...professionalSummaryValidation} /> */}

            <Button onClick={onSubmit} className="primary small" type="submit">
              Add User
            </Button>

            {/* <div className="login-text">
              Already have an account? <Link to="/">Login</Link> now.
            </div> */}
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default AddUser;
