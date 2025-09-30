import { SiLeetcode,SiCodechef } from "react-icons/si";
import {
  FaDiagramProject,
  FaEnvelope,
  FaGithub,
  FaHouse,
  FaLinkedinIn,
  FaRenren,
  FaUser,
} from "react-icons/fa6";
import {
 InterviewBot,
  CodeCraft,
  Aggroassist,
  SpamMail,
  Vehicle,
  AccentRecognition
} from "../assets";

export const Socials = [
  {
    id: `leetcode-${Date.now()}`,
    Icon: SiLeetcode ,
    uri: "https://leetcode.com/u/hs_ss/",
    color: "#1877F2",
  },
  {
    id: `linkedin-${Date.now()}`,
    Icon: FaLinkedinIn,
    uri: "www.linkedin.com/in/himanshu-singh23226",
    color: "#0072b1",
  },
  {
    id: `github-${Date.now()}`,
    Icon: FaGithub,
    uri: "https://github.com/Himanshu0518",
    color: "#fff",
  },
  {
    id: `codechef-${Date.now()}`,
    Icon: SiCodechef,
    uri: "https://www.codechef.com/users/hs_ss",
    color: "#ff0000",
  },
];

export const Menus = [
  {
    id: `home-${Date.now()}`,
    Icon: FaHouse,
    uri: "#home",
    name: "Home",
  },
  {
    id: `about-${Date.now()}`,
    Icon: FaUser,
    uri: "#about",
    name: "About",
  },
  {
    id: `skills-${Date.now()}`,
    Icon: FaRenren,
    uri: "#skills",
    name: "Skills",
  },

  {
    id: `projects-${Date.now()}`,
    Icon: FaDiagramProject,
    uri: "#projects",
    name: "Projects",
  },
  {
    id: `contact-${Date.now()}`,
    Icon: FaEnvelope,
    uri: "#contact",
    name: "Contact",
  },
];

export const ProjectsData = [
  {
    id: `CodeCraft-${Date.now()}`,
    name: "CodeCraft",
    imgSrc: CodeCraft,
    gitURL: "https://github.com/Himanshu0518/CodeCraft",
    demo: "https://codecraft-2f10d.web.app/home",
    description:
      "Real-time code editor with all social features. Built using Firebase, React,Shadcn ui and framer-motion."
  },
  {
    id: `InterviewBot-${Date.now()}`,
    name: "InterviewBot",
    imgSrc: InterviewBot,
    gitURL: "https://github.com/Himanshu0518/Interview-Bot",
    demo: "https://interview-bot-wine.vercel.app/",
    description:
      "AI mock interview and test based on your resume. An assistant built with LangChain, FastAPI, and React."
  },
  {
    id: `Accent-Recognition-${Date.now()}`,
    name: "Accent-Recognition",
    imgSrc: AccentRecognition,
    gitURL: "https://dagshub.com/Himanshu0518/Accent-Recognition",
    demo: "",
    description:
      "ML model for accent recognition using Librosa and scikit-learn. End to End MLOPS pipeline."
  },
  {
    id: `Aggroassist-${Date.now()}`,
    name: "AgroAssist",
    imgSrc: Aggroassist,
    gitURL: "https://github.com/Himanshu0518/Agroassist.git",
    demo: "https://youtu.be/CQRa5K5qehQ",
    description:
      "Build with ML + CNN + TSA. Discovered a different way to recommend crops."
  },
  {
    id: `VehicleInsurancePrediction-${Date.now()}`,
    name: "Vehicle Insurance Prediction",
    imgSrc: Vehicle,
    gitURL: "https://github.com/Himanshu0518/Vehicle-project",
    demo: "https://youtu.be/5e-8gAVst2k",
    description:
      "End-to-end pipeline for vehicle insurance prediction with MLOps and CI/CD."
  },
  {
    id: `SpamClassifier-${Date.now()}`,
    name: "Spam Mail Classifier",
    imgSrc: SpamMail,
    gitURL:
      "https://github.com/Himanshu0518/Spam-detection-End-to-End-pipeline-MLOPS.git",
    demo: "https://spam-detection-qdm1.onrender.com",
    description:
      "Spam detection using TF-IDF + ML with Flask using DVC pipeline."
  }
];

