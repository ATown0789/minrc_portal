import React from "react";
import { useDispatch, useSelector } from "react-redux";
import keywords from "../../../DUMMY_DATA/keywords.json";
import positionOptions from "../../../DUMMY_DATA/positionOptions.json";
import { addJob, editJob } from "Redux/Jobs/jobSlice";
import { stateOptions } from "Components/stateOptions";
import "./addjob.css";
import { useNavigate } from "react-router-dom";
import { addJobPosting, auth, updateJob } from "firebase.config";
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
import { setLoader } from "Redux/Loader/loaderSlice";
import Button from "Components/Button";

const EditJob = ({ job }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  let originalURL = slugify(job.title + job.id);

  const typeFormater = (jobType) => {
    switch (jobType) {
      case "full":
        return positionOptions[0];
        break;
      case "part":
        return positionOptions[1];
        break;
      case "internship":
        return positionOptions[2];
        break;
      case "seasonal":
        return positionOptions[3];
        break;
      default:
        return null;
    }
  };

  const methods = useForm({
    defaultValues: {
      ...job,
      startDate: job.start,
      endDate: job.end,
      summary: job.summary.join("\n\n"),
      description: job.description.join("\n\n"),
      qualifications: job.qualifications.join("\n"),
      responsibilities: job.responsibilities.join("\n"),
      locations: job.location,
      type: typeFormater(job.type),
    },
  });
  const { control } = methods.control;
  const register = methods.register;

  const user = useSelector((state) => state.user);

  const onSubmit = methods.handleSubmit(async (data) => {
    dispatch(setLoader(true));
    let newJob = {
      ...job,
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
    const url = slugify(newJob.title + newJob.id);
    dispatch(editJob(newJob));
    updateJob(newJob);
    navigate(`/view-${url}`);
  });

  return (
    <div className="tab-content">
      <div className="job-form-container">
        <div>
          <h1 className="new-job-h1">Edit {`${job.title}`} Job Posting</h1>
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
              <div className="job-form-input">
                <label className="label">Agency</label>
                <input
                  defaultValue={job.agency}
                  className="agency-input"
                  type="text"
                  readOnly
                  placeholder="Hiring agency"
                  {...register("agency", { required: true })}
                />
              </div>
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

            <div className="btn-container">
              <Button
                onClick={() => {
                  navigate(`/view-${originalURL}`);
                }}
                className="tertiary primary small"
              >
                Cancel
              </Button>

              <Button
                onClick={onSubmit}
                className="primary small"
                type="submit "
              >
                Submit
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default EditJob;
