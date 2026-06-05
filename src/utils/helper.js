import { SiLeetcode, SiCodechef } from "react-icons/si";
import {
  FaDiagramProject,
  FaEnvelope,
  FaGithub,
  FaHouse,
  FaLinkedinIn,
  FaRenren,
  FaUser,
  FaCode,
  FaBriefcase,
} from "react-icons/fa6";
import {
  InterviewBot,
  CodeCraft,
  eShop,
  Vehicle,
  AccentRecognition
} from "../assets";

export const Socials = [
  {
    id: `leetcode-${Date.now()}`,
    Icon: SiLeetcode,
    uri: "https://leetcode.com/u/hs_ss/",
    color: "#1877F2",
  },
  {
    id: `linkedin-${Date.now()}`,
    Icon: FaLinkedinIn,
    uri: "https://www.linkedin.com/in/himanshu-singh23226",
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
    id: `experience-${Date.now()}`,
    Icon: FaBriefcase,
    uri: "#experience",
    name: "Experience",
  },
  {
    id: `projects-${Date.now()}`,
    Icon: FaDiagramProject,
    uri: "#projects",
    name: "Projects",
  },

  {
    id: `blogs-${Date.now()}`,
    Icon: FaCode,
    uri: "#blogs",
    name: "Blogs",
  },

  {
    id: `contact-${Date.now()}`,
    Icon: FaEnvelope,
    uri: "#contact",
    name: "Contact",
  },
];

export const ExperienceData = [
  {
    id: `mindtrot-${Date.now()}`,
    company: "Mindtrot",
    position: "Software Engineer Intern",
    duration: "Dec 2025 - Apr 2026",
    location: "Remote",
    type: "Internship",
    description: [
      "Built real-time analytics dashboards with KPI summaries using React, TypeScript, and Ant Design for CarePilot, ahealthtech SaaS serving home healthcare and assisted-living providers",
      "Developed a Lead Assessment module with a mandatory multi-step intake form, reducing data-entry errors before lead-to-patient conversion "
    ],
    skills: ["React.js", "Ant Design", "TypeScript"],
    current: true
  },
  {
    id: `taiyari24-${Date.now()}`,
    company: "Taiyari24",
    position: "Full Stack Developer",
    duration: "Aug 2025 - Nov 2025",
    location: "Remote",
    type: "Internship",
    description: [
      "Worked on multiple client projects as a freelance Full Stack  Developer",
      "Developed and tested backend systems using Node.js and integrated REST APIs with the frontend using Axios",
      "Handled state management and collaborated on building responsive, scalable web applications"
    ],
    skills: ["React.js", "Express.js", "MongoDB", "Firebase"],
    current: false
  }
];

export const ProjectsData = [
  {
    id: `eShop-${Date.now()}`,
    name: "eShop",
    imgSrc: eShop,
    gitURL:
      "https://github.com/Himanshu0518/eShop",
    demo: "https://e-shop-virid.vercel.app",
    description:
      "An AI-powered e-commerce platform featuring semantic search, personalized recommendations, and CI/CD-driven deployments."
  },
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
    id: `ComplianceQAPipeline-${Date.now()}`,
    name: "ComplianceQA Pipeline",
    imgSrc: "https://opengraph.githubassets.com/88beba2e43b262403a961b808bba93687068f503c4519757a53b546885656e95/Himanshu0518/ComplianceQAPipeline",
    gitURL: "https://github.com/Himanshu0518/ComplianceQAPipeline",
    demo: "",
    description:
      "Automated compliance Q&A pipeline leveraging LLMs and RAG to extract, reason over, and answer regulatory queries from documents."
  },
  {
    id: `VehicleInsurancePrediction-${Date.now()}`,
    name: "Vehicle Insurance Prediction",
    imgSrc: Vehicle,
    gitURL: "https://github.com/Himanshu0518/Vehicle-project",
    demo: "https://youtu.be/5e-8gAVst2k",
    description:
      "End-to-end pipeline for vehicle insurance prediction with MLOps and CI/CD."
  }
];

export const blogs = [
  {
    id: `blog1-${Date.now()}`,
    title: "Beyond Crop Suggestion: Predicting What Grows Best and Pays Best",
    description: "Machine learning model that recommends suitable crops based on soil parameters while predicting profitability. Combines agricultural science with predictive analytics.",
    link: "https://medium.com/@hs7875289/beyond-crop-suggestion-predicting-what-grows-best-and-pays-best-4080e0bc141b",
  },
  {
    id: `blog2-${Date.now()}`,
    title: "Time Series Analysis of Crop Prices in India",
    description: "Comprehensive time series analysis exploring seasonal patterns and trends in Indian crop prices. Includes forecasting techniques and data visualization strategies.",
    link: "https://www.kaggle.com/code/himanshu9648/time-series-analysis-of-crop-prices-in-india",
  },
  {
    id: `blog3-${Date.now()}`,
    title: "English Accent Recognition",
    description: "Audio classification system using Librosa for feature extraction and scikit-learn for modeling. Trained on custom dataset collected from youtube with multiple accent variations.",
    link: "https://www.kaggle.com/code/himanshu9648/accent-recognition",
  },
];
