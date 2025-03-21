import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import Select from "react-select";
import { useJobsStore } from "../store/jobStore";
import { v4 as uuidv4 } from "uuid";

export default function PostJob() {
  const navigate = useNavigate();
  const { addJob, setPreviewJob, jobs } = useJobsStore();

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const [formData, setFormData] = useState({
    company: "",
    location: "",
    jobRole: "",
    languages: [],
    jobType: "",
    salary: "",
    experience: "",
    description: "",
    responsibilities: "",
  });

  const [showFullPreview, setShowFullPreview] = useState(false);

  const languageOptions = [
    { value: "English", label: "English" },
    { value: "Hindi", label: "Hindi" },
    { value: "Spanish", label: "Spanish" },
    { value: "French", label: "French" },
    { value: "German", label: "German" },
    { value: "Chinese", label: "Chinese" },
    { value: "Japanese", label: "Japanese" },
  ];

  const jobTypeOptions = [
    { value: "Full-Time", label: "Full-Time" },
    { value: "Part-Time", label: "Part-Time" },
    { value: "Remote", label: "Remote" },
    { value: "Internship", label: "Internship" },
  ];

  const experienceOptions = [
    { value: "Entry Level", label: "Entry Level" },
    { value: "Mid-Level", label: "Mid-Level" },
    { value: "Senior Level", label: "Senior Level" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selectedOptions, actionMeta) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [actionMeta.name]: selectedOptions,
    }));
  };

  const handlePreview = () => {
    const newJob = {
      ...formData,
      id: uuidv4(),
      location: formData.location.toUpperCase(),
      jobRole: formData.jobRole.toUpperCase(),
      languages: formData.languages.map((lang) => lang.label),
    };

    setPreviewJob(newJob);
    setShowFullPreview(true);
  };

  const saveJobsToLocalStorage = (jobs) => {
    const currentJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const updatedJobs = [...currentJobs, ...jobs].filter((job, index, self) =>
      index === self.findIndex((t) => t.id === job.id)
    );
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
  };

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("jobs"));
    if (savedJobs) {
      savedJobs.forEach((job) => addJob(job));
    }
  }, [addJob]);

  useEffect(() => {
    if (jobs.length > 0) {
      saveJobsToLocalStorage(jobs);
    }
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleSubmit = () => {
    if (!formData.company || !formData.location || !formData.jobRole || formData.languages.length === 0) {
      alert("Please fill in all required fields.");
      return;
    }

    const newJob = {
      ...formData,
      id: uuidv4(),
      location: formData.location.toUpperCase(),
      jobRole: formData.jobRole.toUpperCase(),
      languages: formData.languages.map((lang) => lang.label),
    };

    addJob(newJob);
    saveJobsToLocalStorage([newJob]);
    navigate("/"); 
  };

  return (
    <div className={`${darkMode ? "dark bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-900"} min-h-screen transition`}>
      <nav className={`p-4 shadow-lg ${darkMode ? "bg-gray-800 text-gray-300" : "bg-blue-600 text-white"}`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Jithara AI</h1>
          <div className="flex items-center space-x-4">
            <Link to="/" className={`px-4 py-2 rounded-lg ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white text-blue-600 hover:bg-blue-100"}`}>Back to Jobs</Link>
            <Link to="/company-dashboard" className={`px-4 py-2 rounded-lg ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white text-blue-600 hover:bg-blue-100"}`}>Post a Job</Link>
            <Link to="/login" className={`px-4 py-2 border rounded-lg ${darkMode ? "border-gray-500 hover:bg-gray-700" : "border-white hover:bg-white hover:text-blue-600"}`}>Login</Link>
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full bg-white text-blue-600 hover:bg-gray-200 transition">
              {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mt-6">
        <h1 className="text-3xl font-bold text-center mb-6 dark:text-gray-100">Post a Job</h1>
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          className="w-full p-3 border rounded-lg mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          value={formData.company}
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          className="w-full p-3 border rounded-lg mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          value={formData.location}
          onChange={handleChange}
        />
        <input
          type="text"
          name="jobRole"
          placeholder="Job Role"
          className="w-full p-3 border rounded-lg mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          value={formData.jobRole}
          onChange={handleChange}
        />
        <Select
          name="languages"
          options={languageOptions}
          isMulti
          className="mb-4"
          placeholder="Select Languages Required"
          value={formData.languages}
          onChange={handleSelectChange}
        />
        <Select
          name="jobType"
          options={jobTypeOptions}
          className="mb-4"
          placeholder="Select Job Type"
          value={jobTypeOptions.find(option => option.value === formData.jobType)}
          onChange={(selected) => setFormData({ ...formData, jobType: selected.value })}
        />
        <Select
          name="experience"
          options={experienceOptions}
          className="mb-4"
          placeholder="Select Experience Level"
          value={experienceOptions.find(option => option.value === formData.experience)}
          onChange={(selected) => setFormData({ ...formData, experience: selected.value })}
        />
        <textarea
          name="description"
          placeholder="Job Description"
          className="w-full p-3 border rounded-lg mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          rows="4"
          value={formData.description}
          onChange={handleChange}
        />
        <textarea
          name="responsibilities"
          placeholder="Job Responsibilities"
          className="w-full p-3 border rounded-lg mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          rows="4"
          value={formData.responsibilities}
          onChange={handleChange}
        />
        <button
          onClick={handlePreview}
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition"
        >
          Preview Job Posting
        </button>
      </div>

      {showFullPreview && (
        <div className="max-w-2xl mx-auto bg-gray-100 dark:bg-gray-800 p-6 mt-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-3 dark:text-gray-100">Full Job Posting Details</h2>
          <p><strong>Company:</strong> {formData.company}</p>
          <p><strong>Location:</strong> {formData.location.toUpperCase()}</p>
          <p><strong>Job Role:</strong> {formData.jobRole.toUpperCase()}</p>
          <p><strong>Languages Required:</strong> {formData.languages.map((lang) => lang.label).join(", ")}</p>
          <p><strong>Job Type:</strong> {formData.jobType}</p>
          <p><strong>Experience:</strong> {formData.experience}</p>
          <p><strong>Description:</strong> {formData.description}</p>
          <p><strong>Responsibilities:</strong> {formData.responsibilities}</p>
          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 text-white p-3 rounded-lg font-bold mt-4 hover:bg-green-700 transition"
          >
            Submit Job Posting
          </button>
        </div>
      )}
    </div>
  );
}
