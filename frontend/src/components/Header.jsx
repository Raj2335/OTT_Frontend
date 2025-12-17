import React, { useState, useRef } from "react";
import { Logo } from "../assets/index";
import { Link, useNavigate } from "react-router-dom";
import { SignUp, SignIn } from "../components/index";
import LogoutConfirmation from "./LogoutConfirmation";
import { useSearch } from "../context/SearchContext";
import { useAuth } from "../context/AuthContext";
import videoService from "../services/videoService";

function Header() {
  const [signup, setSignup] = useState(false);
  const [signin, setSignin] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { setSearchResults, setIsSearching, setSearchQuery, clearSearch } = useSearch();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  // Manual debounce implementation
  const handleSearch = (e) => {
    const query = e.target.value;
    setInputValue(query);
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // If input is cleared, clear search immediately
    if (!query.trim()) {
      clearSearch();
      return;
    }
    
    // Set a new timeout for debounced search
    timeoutRef.current = setTimeout(() => {
      performSearch(query);
    }, 500); // 500ms delay
  };
  
  const performSearch = async (query) => {
    if (!query || query.trim() === "") {
      clearSearch();
      return;
    }

    try {
      setIsSearching(true);
      const result = await videoService.searchVideos(query);
      
      if (result.success) {
        setSearchResults(result.data.videos || []);
        setSearchQuery(query);
        
        // Navigate to home to show search results
        navigate("/");
      } else {
        console.error("Search error:", result.message);
        clearSearch();
      }
    } catch (error) {
      console.error("Search error:", error);
      clearSearch();
    }
  };

  // Clean up timeout on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
      setShowLogoutConfirm(false);
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <>
      <div
        className={`navbar shadow-sm px-4 ${signup ? "z-20" : "z-0"} ${
          signin ? "z-20" : "z-0"
        }`}
        style={{
          background:
            "radial-gradient(ellipse 90% 90% at 50% 40%, rgba(70, 192, 141, 0.25), transparent 100%), #000000",
        }}
      >
        <div className="navbar-start">
          <div className="avatar cursor-pointer" onClick={() => navigate('/')}>
            <div className=" h-10 w-10 rounded-full">
              <img src={Logo} alt="Logo" />
            </div>
            <span className="text-white text-2xl my-auto mx-1 font-bold">
              Trenzz
            </span>
          </div>
        </div>
        <div className="navbar-center ">
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="text"
              className="grow w-[20rem]"
              placeholder="Search videos by title or creator"
              value={inputValue}
              onChange={handleSearch}
            />
            {inputValue && (
              <button 
                className="text-gray-400 hover:text-white"
                onClick={() => {
                  setInputValue("");
                  clearSearch();
                }}
              >
                ✕
              </button>
            )}
          </label>{" "}
        </div>
        <div className="navbar-end gap-x-3">
          {isAuthenticated ? (
            <>
              <button
                className="btn bg-purple-700 hover:cursor-pointer hover:scale-x-110 transition-all duration-200"
                onClick={() => navigate('/mycontent')}
              >
                <Link to={"/mycontent"}>My Profile</Link>
              </button>
              <div className="relative">
                <button
                  className="btn bg-red-600 hover:bg-red-700 hover:cursor-pointer hover:scale-x-110 transition-all duration-200"
                  onClick={handleLogoutClick}
                >
                  Logout
                </button>
                {/* Logout Confirmation Popup */}
                <LogoutConfirmation
                  isVisible={showLogoutConfirm}
                  onConfirm={handleLogout}
                  onCancel={handleCancelLogout}
                  isLoggingOut={isLoggingOut}
                />
              </div>
            </>
          ) : (
            <>
              <button
                className="btn bg-amber-500 hover:cursor-pointer hover:scale-x-110 transition-all duration-200"
                onClick={() => setSignin(true)}
              >
                <Link to={""}>Sign in</Link>
              </button>
              {signin && <SignIn onClose={() => setSignin(false)} />}

              <button
                className="btn bg-purple-800 hover:cursor-pointer hover:scale-x-110 transition-all duration-200"
                onClick={() => setSignup(true)}
              >
                <Link to={""}>Sign up</Link>
              </button>
              {signup && <SignUp onClose={() => setSignup(false)} />}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
