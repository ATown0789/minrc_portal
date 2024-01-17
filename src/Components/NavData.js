import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as CgIcons from "react-icons/cg";
import * as SiIcons from "react-icons/si";

export const LoginNavTabOptions = [
  {
    title: "Applicants",
    path: "/",
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: "Agencies",
    path: "/applicant-profile",
    icon: <CgIcons.CgProfile />,
  },
];
