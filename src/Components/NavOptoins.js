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
    title: "Home",
    path: "/applicant-home",
    icon: <FaBriefcase />,
  },
  {
    title: "Profile",
    path: "/applicant-profile",
    icon: <CgProfile />,
  },

  {
    title: "Contact",
    path: "/contact",
    icon: <IoIcons.IoMdHelpCircle />,
  },
];

export const AgencyTabOptions = [
  {
    title: "Home",
    path: "/agency-home",
    icon: <MdDashboard />,
  },
  {
    title: "Profile",
    path: "/agency-profile",
    icon: <CgProfile />,
  },

  {
    title: "Contact",
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
    title: "Home",
    path: "/super-home",
    icon: <MdDashboard />,
  },
  {
    title: "Profile",
    path: "/agency-profile",
    icon: <CgProfile />,
  },

  {
    title: "Contact",
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

export const defaultTabOptions = [
  {
    title: "Home",
    path: "/",
    icon: <AiFillHome />,
  },
  {
    title: "Contact",
    path: "/contact",
    icon: <IoIcons.IoMdHelpCircle />,
  },
];
