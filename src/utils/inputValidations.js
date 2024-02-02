import { stateOptions } from "Components/stateOptions";

export const fNameValidation = {
  name: "fName",
  label: "First Name",
  type: "text",
  id: "fName",
  className: "input",
  placeholder: "First name",
  columns: "35",
  validation: {
    required: {
      value: true,
      message: "required",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
  },
};

export const lNameValidation = {
  name: "lName",
  label: "Last Name",
  type: "text",
  id: "lName",
  className: "input",
  placeholder: "Last name",
  validation: {
    required: {
      value: true,
      message: "required",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
  },
};

export const passwordValidation = {
  name: "password",
  label: "Password",
  type: "password",
  id: "password",
  placeholder: "Password must be at least 8 characters",
  validation: {
    required: {
      value: true,
      message: "required",
    },
    pattern: {
      value:
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,30}$/,
      message:
        "password must contain at least 8 characters, one lowercase letter, one uppercase letter, one numeric digit, and one special character",
    },
  },
};

export const emailValidation = {
  name: "email",
  label: "Email",
  type: "email",
  id: "email",
  placeholder: "Your email address",
  validation: {
    required: {
      value: true,
      message: "required",
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "enter a valid email address",
    },
  },
};

export const minrcYearValidation = {
  name: "minrcYear",
  label: "MINRC Cohort Year",
  type: "number",
  id: "minrcYear",
  placeholder: "YYYY",
  validation: {
    required: {
      value: true,
      message: "required",
    },
    min: {
      value: 2007,
      message: "Select a year between 2007 and 2024",
    },
    max: {
      value: 2024,
      message: "Select a year between 2007 and 2024",
    },
  },
};

export const applicantLocationValidation = {
  name: "location",
  label: "Current Location",
  id: "location",
  type: "select",
  placeholder: "Select your state",
  validation: {
    required: {
      value: true,
      message: "required",
    },
  },
};

export const educationValidation = {
  name: "education",
  label: "Highest Level of Completed Education",
  id: "education",
  type: "select",
  placeholder: "Select education",
  validation: {
    required: {
      value: true,
      message: "required",
    },
  },
};

export const applicantAoisValidation = {
  name: "applicantAois",
  label: "Related Areas of Interest",
  id: "applicantAois",
  type: "multiselect",
  placeholder: "Select up to 5 areas of interest",
  max: 5,
  validation: {
    required: {
      value: true,
      message: "required",
    },
  },
};

export const applicantSkillsValidation = {
  name: "applicantSkills",
  label: "Skills",
  id: "applicantSkills",
  type: "multiselect",
  placeholder: "Select up to 5 skills",
  max: 5,
  validation: {
    required: {
      value: true,
      message: "required",
    },
  },
};

export const professionalSummaryValidation = {
  name: "professionalSummary",
  label: "Professional Summary",
  id: "professionalSummary",
  className: "input",
  type: "textarea",
  columns: "35",
  rows: "5",
  placeholder: "A 3-5 sentence professional summary",
  validation: {
    required: {
      value: true,
      message: "required",
    },
    maxLength: {
      value: 3000,
      message: "3000 characters max",
    },
  },
};

export const titleValidation = {
  name: "title",
  label: "Title",
  type: "text",
  id: "title",
  className: "input",
  placeholder: "Job title",
  validation: {
    required: {
      value: true,
      message: "required",
    },
    maxLength: {
      value: 90,
      message: "90 characters max",
    },
  },
};

export const dueDateValidation = {
  name: "dueDate",
  label: "Application Due Date",
  type: "text",
  id: "dueDate",
  className: "input",
  placeholder: "Date application is due",
  validation: {
    required: {
      value: true,
      message: "required",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
  },
};

export const summaryValidation = {
  name: "summary",
  label: "Summary",
  id: "summary",
  className: "input",
  type: "textarea",
  columns: "35",
  rows: "5",
  placeholder:
    "A short summary of the position. This is shown on applicants home view only. Pressing 'Enter' (new line) starts a new paragraph when posting is viewed.",
  validation: {
    required: {
      value: true,
      message: "required",
    },
    maxLength: {
      value: 3000,
      message: "3000 characters max",
    },
  },
};

export const locationsValidation = {
  name: "locations",
  label: "Locations",
  id: "locations",
  type: "multiselect",
  placeholder: "Locations position is available",
  validation: {
    required: {
      value: true,
      message: "required",
    },
  },
};

export const remoteValidation = {
  name: "remote",
  label: "Remote available?",
  id: "remote",
  type: "checkbox",
  placeholder: "",
};

export const aoisValidation = {
  name: "aois",
  label: "Related Areas of Interest",
  id: "aois",
  type: "multiselect",
  placeholder: "Select areas related to position",
  validation: {
    required: {
      value: true,
      message: "required",
    },
  },
};

export const skillsValidation = {
  name: "skills",
  label: "Preferred Skills",
  id: "skills",
  type: "multiselect",
  placeholder: "Select preferred skills",
  validation: {
    required: {
      value: true,
      message: "required",
    },
  },
};

export const typeValidation = {
  name: "type",
  label: "Employment Type",
  id: "type",
  type: "select",
  placeholder: "Select type",
  validation: {
    required: {
      value: true,
      message: "required",
    },
  },
};

export const agencyValidation = {
  name: "agency",
  label: "Agency Name",
  type: "text",
  id: "agency",
  className: "input",
  placeholder: "Hiring agency name",
  validation: {
    required: {
      value: true,
      message: "required",
    },
  },
};

export const salaryValidation = {
  name: "salary",
  label: "Salary",
  type: "text",
  id: "salary",
  className: "input",
  placeholder: "Enter position salary",
  validation: {
    required: {
      value: true,
      message: "required",
    },
  },
};

export const startDateValidation = {
  name: "startDate",
  label: "Position Start Date",
  type: "date",
  id: "startDate",
  className: "input",
  placeholder: "mm/dd/yyyy",
  validation: {
    required: {
      value: true,
      message: "required",
    },
  },
};

export const endDateValidation = {
  name: "endDate",
  label: "Position End Date",
  type: "date",
  id: "endDate",
  className: "input",
  placeholder: "mm/dd/yyyy",
  validation: {
    required: {
      value: true,
      message: "required",
    },
  },
};

export const descriptionValidation = {
  name: "description",
  label: "Position Description",
  type: "textarea",
  id: "description",
  columns: "35",
  rows: "8",
  placeholder:
    "Full position description. The description is only shown when an applicant views detailed job page. To start new paragraphs press 'Enter' (new line).",
  className: "text-input",
  validation: {
    required: {
      value: true,
      message: "required",
    },
    maxLength: {
      value: 3000,
      message: "3000 characters max",
    },
  },
};

export const responsibilitiesValidation = {
  name: "responsibilities",
  label: "Responsibilities",
  type: "textarea",
  id: "responsibilities",
  columns: "35",
  rows: "5",
  placeholder:
    "Core responsibilities of the position. Pressing 'Enter' (new line) starts a new bullet point when viewed in job posting.",
  className: "text-input",
  validation: {
    maxLength: {
      value: 3000,
      message: "3000 characters max",
    },
  },
};

export const qualificationsValidation = {
  name: "qualifications",
  label: "Qualifications",
  type: "textarea",
  id: "qualifications",
  columns: "35",
  rows: "5",
  placeholder:
    "Additional qualifications that would help a candidate stand out. Pressing 'Enter' (new line) starts a new bullet point when viewed in job posting.",
  className: "text-input",
  validation: {
    maxLength: {
      value: 3000,
      message: "3000 characters max",
    },
  },
};

export const websiteValidation = {
  name: "website",
  label: "Website",
  type: "url",
  id: "website",
  placeholder: "Website for applicants to learn more",
  validation: {
    pattern: {
      value:
        /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i,
      message: "please enter a valid URL",
    },
  },
};

export const hiringNameValidation = {
  name: "hiringName",
  label: "Direct Hiring Contact Name",
  type: "text",
  id: "hiringName",
  className: "input",
  placeholder: "Contact Name",
  validation: {
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
    minLength: {
      value: 2,
      message: "must be at least 2 characters",
    },
  },
};

export const hiringEmailValidation = {
  name: "hiringEmail",
  label: "Direct Hiring Email",
  type: "email",
  id: "hiringEmail",
  placeholder: "Contact email address",
  validation: {
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "please enter a valid email address",
    },
  },
};

export const hiringPhoneValidation = {
  name: "hiringNumber",
  label: "Direct Hiring Phone",
  type: "tel",
  id: "hiringNumber",
  placeholder: "Contact phone number",
  validation: {
    pattern: {
      value:
        /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]‌​)\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)([2-9]1[02-9]‌​|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})\s*(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+)\s*)?$/i,
      message: "please enter a valid phone number",
    },
  },
};

export const agencyNameValidation = {
  name: "agencyName",
  label: "Agency",
  type: "text",
  id: "agencyName",
  className: "input",
  placeholder: "Agency name",
  columns: "35",
  validation: {
    required: {
      value: true,
      message: "required",
    },
    maxLength: {
      value: 60,
      message: "60 characters max",
    },
  },
};

export const agencyEmailValidation = {
  name: "agencyEmail",
  label: "Agency Email",
  type: "text",
  id: "agencyEmail",
  className: "input",
  placeholder: "Agency email address",
  columns: "35",
  validation: {
    required: {
      value: true,
      message: "required",
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "enter a valid email address",
    },
  },
};

export const agencyLocationValidation = {
  name: "location",
  label: "Agency Location",
  id: "location",
  type: "select",
  placeholder: "Select agency state",
  validation: {
    required: {
      value: true,
      message: "required",
    },
  },
};

export const newUserFNameValidation = {
  name: "fName",
  label: "New User's First Name",
  type: "text",
  id: "fName",
  className: "input",
  placeholder: "New users first name",
  columns: "35",
  validation: {
    required: {
      value: true,
      message: "required",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
  },
};

export const newUserLNameValidation = {
  name: "lName",
  label: "New User's Last Name",
  type: "text",
  id: "lName",
  className: "input",
  placeholder: "New user's last name",
  validation: {
    required: {
      value: true,
      message: "required",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
  },
};

export const newUserPasswordValidation = {
  name: "password",
  label: "Temporary Password",
  type: "password",
  id: "password",
  autoComplete: "off",
  placeholder: "Set a temporary password",
  validation: {
    required: {
      value: true,
      message: "required",
    },
  },
};

export const newUserEmailValidation = {
  name: "email",
  label: "New Uer's Email",
  type: "email",
  id: "email",
  placeholder: "New user's email address",
  autoComplete: "off",
  validation: {
    required: {
      value: true,
      message: "required",
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "enter a valid email address",
    },
  },
};

export const newUserTypeSelectValidation = {
  name: "userType",
  label: "User Type",
  id: "userType",
  type: "select",
  placeholder: "Select user type",
  validation: {
    required: {
      value: true,
      message: "required",
    },
  },
};
