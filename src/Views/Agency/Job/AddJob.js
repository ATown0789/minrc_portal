import React, { useEffect, useId, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import keywords from "../../../DUMMY_DATA/keywords.json";
import positionOptions from "../../../DUMMY_DATA/positionOptions.json";
import { addJob } from "Redux/Jobs/jobSlice";
import { stateOptions } from "Components/stateOptions";
import "./addjob.css";
import { useNavigate } from "react-router-dom";
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

const AddJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const methods = useForm();
  const { control } = useForm();
  const register = methods.register;
  const errors = methods.formState.errors;

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
      match: 0,
    };
    console.log(job);
    let newJobID = await addJobPosting(job);
    console.log(await newJobID);

    dispatch(addJob({ ...job, id: newJobID }));

    navigate("/job-post-success");
  });

  return (
    <div className="job-form-container">
      <div>
        <h1 className="new-job-h1">Create New Job Posting</h1>
      </div>

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

          <button
            onClick={onSubmit}
            className="submit-btn job-submit"
            type="submit"
          >
            Submit
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddJob;
