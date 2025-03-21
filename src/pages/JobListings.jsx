import React, { useState, useEffect } from "react";
import { useJobsStore } from "../store/jobStore"; 
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid'; 
import { FaSun, FaMoon } from 'react-icons/fa'; 

export default function JobListings() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const [jobs, setJobs] = useState([]);
  const { addJob } = useJobsStore();

  useEffect(() => {
    const storedJobsFromLocalStorage = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(storedJobsFromLocalStorage); 
  }, []);

  const handlePostJob = (jobData) => {
    const newJob = {
      ...jobData,
      uuid: uuidv4(), 
    };
    addJob(newJob); 
    setJobs((prevJobs) => {
      const updatedJobs = [...prevJobs, newJob];
      localStorage.setItem("jobs", JSON.stringify(updatedJobs)); 
      return updatedJobs;
    }); 
  };

  const typeColors = {
    "Full-Time": "bg-blue-200 text-blue-900 dark:bg-blue-500 dark:text-white",
    "Remote": "bg-green-200 text-green-900 dark:bg-green-500 dark:text-white",
    "Part-Time": "bg-red-200 text-red-900 dark:bg-red-500 dark:text-white",
    "Internship": "bg-purple-200 text-purple-900 dark:bg-purple-500 dark:text-white",
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.target.search.value.toLowerCase(); 
    const filteredJobs = jobs.filter(job => job.jobRole.toLowerCase().includes(query)); 
    setJobs(filteredJobs); 
  };

  return (
    <div className={`${darkMode ? "dark bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-900"} min-h-screen transition-colors duration-300`}>
     
      <nav className={`p-4 text-white shadow-lg ${darkMode ? "bg-gray-800" : "bg-blue-600"}`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Jithara AI</h1>
          <div className="flex items-center space-x-4">
            <Link to="/company-dashboard" className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-100">Post a Job</Link>
            <Link to="/login" className="px-4 py-2 border border-white rounded-lg hover:bg-white hover:text-blue-600">Login</Link>
          
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-white text-blue-600 hover:bg-gray-200 transition"
            >
              {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <header className={`text-center py-16 transition duration-300 ${darkMode ? "bg-gray-700" : "bg-blue-500"} text-white`}>
        <h2 className="text-4xl font-bold">Find Your Dream Job</h2>
        <p className="text-lg mt-2">Explore thousands of job listings from top companies</p>
        <div className="mt-6">
          <form onSubmit={handleSearch}>
            <input 
              type="text" 
              name="search"
              placeholder="Search for jobs..." 
              className="p-3 w-1/2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition dark:bg-gray-700 dark:text-white"
            />
            <button type="submit" className="p-3 bg-yellow-500 text-white rounded-lg ml-2">Search</button>
          </form>
        </div>
      </header>

    
      <section className="container mx-auto py-12">
        <h3 className="text-2xl font-bold mb-6">Latest Job Listings</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.length === 0 ? (
            <p className="text-gray-500 text-lg dark:text-gray-400">No job postings available yet.</p>
          ) : (
            jobs.map((job) => (
              <div 
                key={job.uuid} 
                className={`p-6 rounded-lg shadow-lg transition ${darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900"}`}
              >
                <h4 className="text-xl font-semibold text-gray">{job.jobRole}</h4>
                <p className="text-gray-400">{job.company} - {job.location}</p>
                <span className={`text-sm px-2 py-1 rounded-md ${typeColors[job.jobType]}`}>
                  {job.jobType}
                </span>
                <p className="mt-3 text-gray-300 dark:text-gray-400">{job.description.substring(0, 100)}...</p>
                <Link 
                  to={`/job-details/${job.uuid}`} 
                  className="mt-4 block text-blue-400 font-semibold hover:underline"
                >
                  Apply Now →
                </Link>
              </div>
            ))
          )}
        </div>
      </section>

   
      <footer className={`text-center p-4 mt-8 ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-900 text-white"}`}>
        <p>&copy; 2025 Jithara AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
