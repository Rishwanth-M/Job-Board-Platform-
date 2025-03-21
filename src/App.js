import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JobListings from './pages/JobListings'; 
import CompanyDashboard from './pages/CompanyDashboard'; 
import JobDetails from "./pages/JobDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobListings />} />
        <Route path="/company-dashboard" element={<CompanyDashboard />} />
        <Route path="/job-details/:id" element={<JobDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
