import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { RiUserFollowLine } from "react-icons/ri";
import videoService from "../services/videoService";
import { formatTimeAgo } from "../utils/timeFormatter";
import Home from './Home'

function VideoSection() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true);
      const result = await videoService.getVideoById(id);

      if (result.success) {
        setVideo(result.data);
      } else {
        console.error("Error fetching video:", result.message);
      }

      setLoading(false);
    };

    fetchVideo();
  }, [id]);

  if (loading) return <div className="text-white text-center">Loading video...</div>;
  if (!video) return <div className="text-white text-center">Video not found.</div>;

  return (
    <div className="bg-black/50 px-2 pt-5 grid gap-x-2 sm:grid-cols-12 h-full">
      {/* -- 1st Column -- */}
      <div className="h-[85%] col-span-8 flex flex-col gap-3 px-2">
        <div className="border-2 border-emerald-500 h-[70%] rounded-2xl overflow-hidden">
          {/* border border-blue-600 shadow-[0_0_10px_blue] */}
          <ReactPlayer
            src={video.videoFile}
            width="100%"
            height="100%"
            controls
            playing={false}
          />
        </div>

        <div className="border-2 border-emerald-500 h-[30%] rounded-2xl pt-1 pb-4">
          <div className="flex flex-col gap-0">
            <div className="px-4 py-1 h-[44%] w-full line-clamp-2">
              <span className="text-2xl font-bold">{video.title}</span>
            </div>
            <div className="px-3 py-2 flex items-center h-[38%]">
              <div className="h-12 w-12 rounded-full border-3 overflow-hidden mt-2 ml-1">
                <img 
                  src={video.owner?.avatar || "https://via.placeholder.com/44"} 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-bold ml-6 -mt-2">{video.owner?.fullName || "Unknown"}</span>
              <button className="bg-red-600 text-white font-bold rounded-4xl h-11 px-3 ml-auto -mb-4 cursor-pointer  hover:scale-95 hover:bg-red-800 transition duration-[200ms] flex items-center gap-2">
                <RiUserFollowLine size={20} />
                Subscribe
              </button>
            </div>
            <div className="text-sm pl-[10.5%] -mt-7">
              <ul className="flex gap-5">
                <li>
                  <span>{video.views} views</span>
                </li>
                <li className="relative pl-3 before:content-['•'] before:absolute before:left-0">
                  <span>{formatTimeAgo(video.createdAt)}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* -- 2nd Column -- */}
      <style>
        {`
      .hide-scrollbar {
        scrollbar-width: none;
      }
      `}
      </style>
      <div className="col-span-4 h-[96%] overflow-y-auto scroll-smooth hide-scrollbar border-2 border-gray-500 shadow-[0_0_8px_emerald] rounded-xl">
        <div className="flex justify-center pt-3">
          <span className="text-3xl">Related Videos</span>
        </div>
        <div className="flex justify-center pr-8 -mt-8">
          <Home columns="grid-cols-1" autoRows="sm:auto-rows-[260px]" cardLayout="vertical" bgColor="transparent" />
        </div>
      </div>
    </div>
  );
}

export default VideoSection;