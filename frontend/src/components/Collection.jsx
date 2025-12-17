import React, { useState, useEffect } from 'react'
import { Himage1 } from '../assets'
import { BsPlayBtnFill } from "react-icons/bs"
import Home from './Home'
import videoService from '../services/videoService'

function Collection() {
  const [homeActive, setHomeActive] = useState(false)
  const [totalVideos, setTotalVideos] = useState(0)

  // Fetch total video count when component mounts
  useEffect(() => {
    const fetchVideoCount = async () => {
      try {
        // Fetch with a larger limit to get a better estimate of total videos
        const result = await videoService.getAllVideos(1, 100);
        if (result.success && result.data) {
          // Count the videos from the response
          const videoCount = result.data.videos?.length || 0;
          setTotalVideos(videoCount);
          
          // If there are more videos (hasMore is true), we know there are at least this many
          if (result.data.hasMore && videoCount === 100) {
            setTotalVideos(videoCount + '+'); // Show 100+ if there are more
          }
        }
      } catch (error) {
        console.error("Error fetching video count:", error);
        setTotalVideos(0);
      }
    };

    fetchVideoCount();
  }, [])

  return (
    homeActive ? (
      <Home columns="grid-cols-3" autoRows="sm:auto-rows-[280px]" cardLayout="vertical"/>
    ) : (
      <div className="grid place-items-center h-full" onClick={() => setHomeActive(true)}>
        <div className="stack size-28 min-h-[280px] min-w-[450px] rounded-lg">
          {/* First Card */}
          <div className="relative card border-2 border-gray-600 text-center overflow-hidden group">
            {/* Play Icon Overlay */}
            <div className="absolute inset-0 bg-black/75 pointer-events-none rounded-lg flex justify-center items-center z-10">
              <BsPlayBtnFill size={60} color="white" />
            </div>

            {/* Image with hover scale */}
            <img
              src={Himage1}
              className="rounded-box w-full h-full object-fill transform transition-transform duration-300 group-hover:scale-105"
            />

            {/* Bottom Right Label */}
            <div className="absolute bottom-2 right-2 font-bold bg-black/30 text-white text-sm px-1 py-0.5 rounded-md flex items-center gap-0.5 z-20">
              <span>≡</span>
              <span className="text-xs">{totalVideos || '...'}</span>
              <span className="text-xs">videos</span>
            </div>
          </div>

          {/* Second Card */}
          <div className="border-gray-400/50 card border text-center overflow-hidden group">
            <img
              src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
              className="rounded-box h-full transform transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Third Card */}
          <div className="border-gray-400/50 card border text-center overflow-hidden group">
            <img
              src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
              className="rounded-box h-full transform transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    )
  );
}

export default Collection;