import { Link } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Navbar({ toggleTheme, theme }) {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 shadow-lg">
      <div className="container mx-auto max-w-screen-xl flex justify-between items-center">
      
        <h1 className="text-2xl font-bold text-white">Jithara AI</h1>

        <div className="flex gap-4 items-center">
          <Link 
            to="/company-dashboard" 
            className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-100 transition"
          >
            Post a Job
          </Link>

          <Link 
            to="/login"
            className="px-4 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition"
          >
            Login
          </Link>

          <button 
            onClick={toggleTheme} 
            className="p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition flex items-center"
          >
            {theme === "dark" ? <FaSun size={18} /> : <FaMoon size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
