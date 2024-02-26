import React from "react";
import { FaBriefcase } from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { AiFillHome } from "react-icons/ai";
import * as SiIcons from "react-icons/si";
import { MdDashboard } from "react-icons/md";

export const LoginNavTabOptions = [
  {
    title: "Applicants",
    path: "/",
    icon: <AiFillHome />,
  },
  {
    title: "Agencies",
    path: "/",
    icon: <MdDashboard />,
  },
];

export const ApplicantTabOptions = [
  {
    title: "Job Board",
    path: "/applicant-home",
    icon: <FaBriefcase />,
  },
  {
    title: "Profile",
    path: "/applicant-profile",
    icon: <CgProfile />,
  },

  {
    title: "Support",
    path: "/contact",
    icon: <IoIcons.IoMdHelpCircle />,
  },
];

export const AgencyTabOptions = [
  {
    title: "Dashboard",
    path: "/agency-home",
    icon: <MdDashboard />,
  },
  {
    title: "Profile",
    path: "/agency-profile",
    icon: <CgProfile />,
  },

  {
    title: "Support",
    path: "/contact",
    icon: <IoIcons.IoMdHelpCircle />,
  },
  {
    title: "+ Job Posting",
    path: "/add-job",
    icon: <FaBriefcase />,
  },
  {
    title: "All Applicants",
    path: "/view-applicants",
    icon: <SiIcons.SiBookstack />,
  },
];

export const SuperTabOptions = [
  {
    title: "Dashboard",
    path: "/super-home",
    icon: <MdDashboard />,
  },
  {
    title: "Profile",
    path: "/agency-profile",
    icon: <CgProfile />,
  },

  {
    title: "New User",
    path: "/add-user",
    icon: <IoIcons.IoMdHelpCircle />,
  },
  {
    title: "+ Job Posting",
    path: "/add-job",
    icon: <FaBriefcase />,
  },
  {
    title: "All Applicants",
    path: "/view-applicants",
    icon: <SiIcons.SiBookstack />,
  },
];

export const defaultTabOptions = [
  {
    title: "Log In",
    path: "/",
    icon: <AiFillHome />,
  },
  {
    title: "Support",
    path: "/contact",
    icon: <IoIcons.IoMdHelpCircle />,
  },
];
