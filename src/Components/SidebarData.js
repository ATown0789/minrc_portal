import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as CgIcons from "react-icons/cg";
import * as SiIcons from "react-icons/si";

export const ApplicantSidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: "Profile",
    path: "/applicant-profile",
    icon: <CgIcons.CgProfile />,
  },
  {
    title: "LogOut",
    path: "logout",
    icon: <IoIcons.IoMdLogOut />,
  },
  {
    title: "Contact",
    path: "/contact",
    icon: <IoIcons.IoMdHelpCircle />,
  },
];

export const AgencySidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: "Profile",
    path: "/agency-profile",
    icon: <CgIcons.CgProfile />,
  },
  {
    title: "Log Out",
    path: "logout",
    icon: <IoIcons.IoMdLogOut />,
  },
  {
    title: "Contact",
    path: "/contact",
    icon: <IoIcons.IoMdHelpCircle />,
  },
  {
    title: "+ Job Posting",
    path: "/add-job",
    icon: <FaIcons.FaBriefcase />,
  },
  {
    title: "All Applicants",
    path: "/view-applicants",
    icon: <SiIcons.SiBookstack />,
  },
];

export const SuperSidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: "Profile",
    path: "/agency-profile",
    icon: <CgIcons.CgProfile />,
  },
  {
    title: "Log Out",
    path: "logout",
    icon: <IoIcons.IoMdLogOut />,
  },
  {
    title: "Contact",
    path: "/contact",
    icon: <IoIcons.IoMdHelpCircle />,
  },
  {
    title: "+ Job Posting",
    path: "/add-job",
    icon: <FaIcons.FaBriefcase />,
  },
  {
    title: "All Applicants",
    path: "/view-applicants",
    icon: <SiIcons.SiBookstack />,
  },
];

export const defaultSidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: "Contact",
    path: "/contact",
    icon: <IoIcons.IoMdHelpCircle />,
  },
];
