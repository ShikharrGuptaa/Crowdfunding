import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = async () => {
    await logout(); // Call the logout function from context
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-gray-800/75 backdrop-blur-lg transition-all">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-2xl font-bold text-[#00df9a]">
          <Link to="/">CrowdFunding</Link>
        </div>

        {/* Links */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-[#00df9a]">Home</Link>
          <Link to="/events" className="hover:text-[#00df9a]">Events</Link>

          {/* Conditionally render Create Event */}
          {isLoggedIn && (
            <Link to="/create-event" className="hover:text-[#00df9a]">
              Create Event
            </Link>
          )}

          {/* Conditional Login/Signup or Account/Logout */}
          {isLoggedIn ? (
            <button onClick={handleLogout} className="hover:text-[#00df9a]">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="hover:text-[#00df9a]">
                Login
              </Link>
              <Link to="/signup" className="hover:text-[#00df9a]">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
