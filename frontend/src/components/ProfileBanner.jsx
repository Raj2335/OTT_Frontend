import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import SplitText from "./SplitText";
import Modal from "./Modal";
import LogoutConfirmation from "./LogoutConfirmation";
import VideosTab from "../components/VideosTab";
import FollowersTab from "../components/FollowersTab";
import FollowingTab from "../components/FollowingTab";
import { useAuth } from "../context/AuthContext";
import userService from "../services/userService";
import videoService from "../services/videoService";

const ProfileBanner = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("Videos");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user || !user._id) {
          // Clear data when user is not logged in
          setVideos([]);
          setProfile(null);
          setLoading(false);
          return;
        }

        // Fetch user videos
        const videosResponse = await videoService.getUserVideos();
        if (videosResponse.success) {
          setVideos(videosResponse.data || []);
        }

        setProfile(user);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  if (loading)
    return (
      <div className="text-white text-center py-20 text-xl">
        Loading profile...
      </div>
    );
  if (!profile)
    return (
      <div className="text-white text-center py-20 text-xl">
        Could not load profile. Please{" "}
        <button
          onClick={() => navigate("/")}
          className="text-blue-400 underline"
        >
          sign in
        </button>{" "}
        to view your profile.
      </div>
    );

  // Function to refresh videos after upload
  const handleVideoUploadSuccess = async (newVideo) => {
    // Fetch user videos again
    try {
      const videosResponse = await videoService.getUserVideos();
      if (videosResponse.success) {
        setVideos(videosResponse.data || []);
      }
    } catch (error) {
      console.error("Failed to refresh videos:", error);
    }
  };

  // Function to handle video deletion
  const handleVideoDelete = (deletedVideoId) => {
    setVideos((prevVideos) =>
      prevVideos.filter((video) => video._id !== deletedVideoId)
    );
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate("/"); // Redirect to home page
    } catch (error) {
      console.error("Logout failed:", error);
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
    <div
      className={`h-[100rem] text-white relative pt-4 ${
        showModal ? "z-20" : "z-0"
      }`}
    >
      {/* Banner */}
      <div className="h-48 bg-gradient-to-r from-pink-500 via-orange-300 to-cyan-400 relative">
        {/* Profile Image */}
        <div className="absolute -bottom-16 left-8">
          <img
            src={profile.avatar || "https://via.placeholder.com/100"}
            alt="avatar"
            className="h-32 w-32 border-4 rounded-full"
          />
        </div>
      </div>

      {/* Profile Info */}
      <div className="flex justify-start items-start pt-20 px-8">
        <div>
          <h2>
            <SplitText
              text={`Hello, ${profile.fullName}`}
              className="text-2xl font-semibold text-left"
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="left"
            />
          </h2>
          <p className="text-gray-400">@{profile.username}</p>
          <p className="text-gray-400 mt-1">{profile.email}</p>
        </div>
        {/* ...existing stats and edit button... */}
        <div className="stats shadow gap-x-8 ml-52">
          <div className="stat">
            <div className="stat-figure text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Total Likes</div>
            <div className="stat-value text-primary">25.6K</div>
            <div className="stat-desc">21% more than last month</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
              <div></div>
            </div>
            <div className="stat-title">Page Views</div>
            <div className="stat-value text-secondary">2.6M</div>
            <div className="stat-desc">21% more than last month</div>
          </div>

          <div className="stat">
            <div className="stat-value">86%</div>
            <div className="stat-title">Tasks done</div>
            <div className="stat-desc text-secondary">31 tasks remaining</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex px-8 border-b-2 sticky top-0 bg-[#1d232a] z-50 pt-2 justify-between shadow-md">
        <button
          onClick={() => setActiveTab("Videos")}
          className={`px-4 py-2 ${
            activeTab === "Videos" ? "text-cyan-300" : "text-gray-400"
          } hover:text-white`}
        >
          Videos
        </button>
        <button
          onClick={() => setActiveTab("Followers")}
          className={`px-4 py-2 ${
            activeTab === "Followers" ? "text-white" : "text-gray-400"
          } hover:text-white`}
        >
          Followers
        </button>
        <button
          onClick={() => setActiveTab("Following")}
          className={`px-4 py-2 ${
            activeTab === "Following" ? "text-white" : "text-gray-400"
          } hover:text-white flex items-center gap-2`}
        >
          Following
        </button>

        <div className="flex">
          {/* upload video portion */}
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 text-gray-400 hover:text-white flex items-center gap-2"
          >
            <a className="btn w-30 bg-[#AD46FF] hover:cursor-pointer hover:scale-x-110 transition-all duration-200">
              <FaPlus /> Upload
            </a>
          </button>

          {/* logout button */}
          <div className="relative">
            <button
              onClick={handleLogoutClick}
              className="px-4 py-2 text-gray-400 hover:text-white flex items-center gap-2"
            >
              <a className="btn w-30 bg-red-600 hover:bg-red-700 hover:cursor-pointer hover:scale-x-110 transition-all duration-200">
                <FiLogOut /> Logout
              </a>
            </button>
            {/* Logout Confirmation Popup */}
            <LogoutConfirmation
              isVisible={showLogoutConfirm}
              onConfirm={handleLogout}
              onCancel={handleCancelLogout}
              isLoggingOut={isLoggingOut}
            />
          </div>
        </div>

        {showModal && (
          <Modal
            onClose={() => setShowModal(false)}
            onUploadSuccess={handleVideoUploadSuccess}
          />
        )}
      </div>

      {/* Tab Content */}
      <div className="min-h-full relative z-0 pl-4 pt-4">
        {activeTab === "Videos" && (
          <VideosTab videos={videos} onVideoDelete={handleVideoDelete} />
        )}
        {activeTab === "Followers" && <FollowersTab />}
        {activeTab === "Following" && <FollowingTab />}
      </div>
    </div>
  );
};

export default ProfileBanner;
