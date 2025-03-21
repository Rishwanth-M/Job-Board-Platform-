import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import { Link } from "react-router-dom";


export default function JobDetails() {
  const { uuid } = useParams();
  const [job, setJob] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    const storedJobsFromLocalStorage = JSON.parse(localStorage.getItem("jobs")) || [];
    const selectedJob = storedJobsFromLocalStorage.find((job) => job.uuid === uuid);

    if (selectedJob) {
      setJob(selectedJob);
    }
  }, [uuid]);

  const typeColors = {
    "Full-Time": "bg-blue-200 text-blue-900 dark:bg-blue-500 dark:text-white",
    "Remote": "bg-green-200 text-green-900 dark:bg-green-500 dark:text-white",
    "Part-Time": "bg-red-200 text-red-900 dark:bg-red-500 dark:text-white",
    "Internship": "bg-purple-200 text-purple-900 dark:bg-purple-500 dark:text-white",
  };

  if (!job) {
    return <p className="text-center text-xl text-gray-500">Loading job details...</p>;
  }

  return (
    <div className={`${darkMode ? "dark bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-900"} min-h-screen transition-colors duration-300`}>
      {/* Navbar */}
      <nav className={`p-4 text-white shadow-lg ${darkMode ? "bg-gray-800" : "bg-blue-600"}`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Jithara AI</h1>
          <div className="flex items-center space-x-4">
            <Link to="/company-dashboard" className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-100">Post a Job</Link>
            <Link to="/login" className="px-4 py-2 border border-white rounded-lg hover:bg-white hover:text-blue-600">Login</Link>
            <button 
              onClick={() => {
                setDarkMode(!darkMode);
                localStorage.setItem("darkMode", !darkMode); 
              }}
              className="p-2 rounded-full bg-white text-blue-600 hover:bg-gray-200 transition"
            >
              {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Job Details */}
      <div className="container mx-auto p-8 max-w-4xl bg-white shadow-lg rounded-lg dark:bg-gray-800 dark:text-gray-200">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">{job.jobRole}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">{job.company} - {job.location}</p>
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          <span className={`inline-block text-sm px-4 py-2 rounded-md ${typeColors[job.jobType]}`}>
            {job.jobType}
          </span>
        </div>

        <div className="mt-8 overflow-x-auto">
          <table className="min-w-full table-auto border-collapse bg-white shadow-md dark:bg-gray-800 dark:text-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xl font-semibold text-gray-800 dark:text-white">Attribute</th>
                <th className="px-6 py-3 text-left text-xl font-semibold text-gray-800 dark:text-white">Details</th>
              </tr>
            </thead>
            <tbody>
              {job.experience && (
                <tr>
                  <td className="px-6 py-4 text-lg text-gray-700 dark:text-gray-300">Experience Level</td>
                  <td className="px-6 py-4 text-lg text-gray-700 dark:text-gray-300">{job.experience}</td>
                </tr>
              )}
              {job.languages && job.languages.length > 0 && (
                <tr>
                  <td className="px-6 py-4 text-lg text-gray-700 dark:text-gray-300">Languages</td>
                  <td className="px-6 py-4 text-lg text-gray-700 dark:text-gray-300">
                    <ul className="list-disc ml-5">
                      {job.languages.map((language, index) => (
                        <li key={index}>{language}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              )}
              {job.description && (
                <tr>
                  <td className="px-6 py-4 text-lg text-gray-700 dark:text-gray-300">Job Description</td>
                  <td className="px-6 py-4 text-lg text-gray-700 dark:text-gray-300">{job.description}</td>
                </tr>
              )}
              {job.responsibilities && (
                <tr>
                  <td className="px-6 py-4 text-lg text-gray-700 dark:text-gray-300">Responsibilities</td>
                  <td className="px-6 py-4 text-lg text-gray-700 dark:text-gray-300">{job.responsibilities}</td>
                </tr>
              )}
              {job.howToApply && (
                <tr>
                  <td className="px-6 py-4 text-lg text-gray-700 dark:text-gray-300">How to Apply</td>
                  <td className="px-6 py-4 text-lg text-gray-700 dark:text-gray-300">{job.howToApply}</td>
                </tr>
              )}
              {job.salary && (
                <tr>
                  <td className="px-6 py-4 text-lg text-gray-700 dark:text-gray-300">Salary</td>
                  <td className="px-6 py-4 text-lg text-gray-700 dark:text-gray-300">{job.salary}</td>
                </tr>
              )}
              {job.benefits && (
                <tr>
                  <td className="px-6 py-4 text-lg text-gray-700 dark:text-gray-300">Benefits</td>
                  <td className="px-6 py-4 text-lg text-gray-700 dark:text-gray-300">{job.benefits}</td>
                </tr>
              )}
              {job.companyDetails && (
                <tr>
                  <td className="px-6 py-4 text-lg text-gray-700 dark:text-gray-300">Company Details</td>
                  <td className="px-6 py-4 text-lg text-gray-700 dark:text-gray-300">{job.companyDetails}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex justify-center">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}
