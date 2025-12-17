import { useState, useEffect } from "react";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
import videoService from "../services/videoService";
import { formatTimeAgo } from "../utils/timeFormatter";

export default function UserVideos({ videos: propVideos, onVideoDelete }) {
  const [videos, setVideos] = useState(propVideos || []);
  const [loading, setLoading] = useState(!propVideos);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // If videos are provided as props, use them
    if (propVideos) {
      setVideos(propVideos);
      setLoading(false);
      return;
    }

    // Otherwise fetch them
    const fetchUserVideos = async () => {
      try {
        setLoading(true);
        const response = await videoService.getUserVideos();
        
        if (response.success) {
          setVideos(response.data);
        } else {
          setError(response.message || "Failed to fetch videos");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user videos:", err);
        setError("An unexpected error occurred");
        setLoading(false);
      }
    };

    fetchUserVideos();
  }, [propVideos, navigate]);

  // Update videos when propVideos changes
  useEffect(() => {
    if (propVideos) {
      setVideos(propVideos);
    }
  }, [propVideos]);

  const handleDeleteVideo = (deletedVideoId) => {
    // Update the videos state by removing the deleted video
    setVideos((prevVideos) => prevVideos.filter(video => video._id !== deletedVideoId));
    
    // Call parent handler if provided
    if (onVideoDelete) {
      onVideoDelete(deletedVideoId);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl text-red-500">Error: {error}</h3>
      </div>
    );
  }

  if (videos.length === 0) {
    // Return null here as the empty state is now handled by the VideosTab component
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 relative z-0">
      {videos.map((video) => (
          <Card
            key={video._id}
            videoId={video._id}
            title={video.title}
            authorName={video.owner?.fullName || "Unknown"}
            image={video.thumbnail}
            views={video.views.endsWith(" Views") ? video.views : `${video.views} Views`}
            time={formatTimeAgo(video.createdAt)}
            layout="vertical"
            showDelete={true}
            onDeleteVideo={handleDeleteVideo}
            authorAvatar={video.owner?.avatar}
          />
      ))}
    </div>
  );
}
