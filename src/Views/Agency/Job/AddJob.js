import React, { useEffect, useId, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import keywords from "../../../DUMMY_DATA/keywords.json";
import positionOptions from "../../../DUMMY_DATA/positionOptions.json";
import { addJob } from "Redux/Jobs/jobSlice";
import { stateOptions } from "Components/stateOptions";
import "./addjob.css";
import { Link, useNavigate } from "react-router-dom";
import { addJobPosting, auth } from "firebase.config";
import skilloptions from "../../../DUMMY_DATA/skilloptions.json";
import { FormProvider, useForm } from "react-hook-form";
import {
  locationsValidation,
  titleValidation,
  dueDateValidation,
  summaryValidation,
  remoteValidation,
  aoisValidation,
  skillsValidation,
  typeValidation,
  agencyValidation,
  salaryValidation,
  startDateValidation,
  endDateValidation,
  descriptionValidation,
  responsibilitiesValidation,
  qualificationsValidation,
  websiteValidation,
  hiringNameValidation,
  hiringEmailValidation,
  hiringPhoneValidation,
} from "../../../utils/inputValidations";
import { Input } from "Components/Input";
import { current } from "@reduxjs/toolkit";
import Button from "Components/Button";

const AddJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const date = new Date();
  let day = ("0" + date.getDate()).slice(-2);
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let year = date.getFullYear() - 2000;
  let currentDate = `${month}/${day}/${year}`;
  const user = useSelector((state) => state.user);

  const methods = useForm();
  const { control } = useForm();
  const register = methods.register;
  const errors = methods.formState.errors;

  useEffect(() => {
    console.log(user);
    if (!user.loggedIn) navigate("/");
  }, []);

  const initialValues = {
    agency: user?.agency,
  };

  const onSubmit = methods.handleSubmit(async (data) => {
    let job = {
      title: data.title,
      dueDate: data.dueDate,
      summary: data.summary.split("\n").filter((str) => str.trim() !== ""),
      location: data.locations,
      remote: data.remote,
      aois: data.aois,
      skills: data.skills,
      type: data.type.value,
      agency: data.agency,
      agencyId: auth.currentUser.uid,
      salary: data.salary,
      start: data.startDate,
      end: data.endDate,
      description: data.description
        .split("\n")
        .filter((str) => str.trim() !== ""),
      responsibilities: data.responsibilities
        .split("\n")
        .filter((str) => str.trim() !== ""),
      qualifications: data.qualifications
        .split("\n")
        .filter((str) => str.trim() !== ""),
      website: data.website,
      hiringName: data.hiringName,
      hiringEmail: data.hiringEmail,
      hiringNumber: data.hiringNumber,
      dateCreated: currentDate,
      match: 0,
    };
    console.log(job);
    let newJobID = await addJobPosting(job);
    console.log(await newJobID);

    dispatch(addJob({ ...job, id: newJobID }));

    navigate("/job-post-success");
  });

  return (
    <div className="tab-content">
      <div style={{ marginTop: "0", marginBottom: "20px" }}>
        <Link>Dashboard</Link> <span>{`>`}</span> <span>New Job Posting</span>
      </div>
      <div>
        <h1 className="new-job-h1">New Job Posting</h1>
      </div>
      <div className="job-form-container">
        <FormProvider {...methods}>
          <form
            className="new-job-form"
            onSubmit={(e) => e.preventDefault()}
            noValidate
            autoComplete="off"
          >
            <Input {...titleValidation} />
            <Input {...dueDateValidation} />
            <Input {...summaryValidation} />
            <Input
              {...locationsValidation}
              options={stateOptions}
              control={control}
            />
            <Input {...remoteValidation} />
            <Input {...aoisValidation} options={keywords} control={control} />
            <Input
              {...skillsValidation}
              options={skilloptions}
              control={control}
            />
            <Input
              {...typeValidation}
              options={positionOptions}
              control={control}
            />

            {user?.agency && !!user?.agency ? (
              <>
                <label className="agency-label label">Agency</label>
                <input
                  defaultValue={initialValues.agency}
                  className="agency-input"
                  type="text"
                  readOnly
                  placeholder="Hiring agency"
                  {...register("agency", { required: true })}
                />
              </>
            ) : (
              <Input {...agencyValidation} />
            )}

            <Input {...salaryValidation} />
            <Input {...startDateValidation} />
            <Input {...endDateValidation} />
            <Input {...descriptionValidation} />
            <Input {...responsibilitiesValidation} />
            <Input {...qualificationsValidation} />
            <Input {...websiteValidation} />
            <Input {...hiringNameValidation} />
            <Input {...hiringEmailValidation} />
            <Input {...hiringPhoneValidation} />

            <Button
              style={{ marginTop: "30px" }}
              onClick={onSubmit}
              className="primary"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default AddJob;
