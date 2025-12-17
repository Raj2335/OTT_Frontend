
import React, { useEffect, useState, useCallback } from "react";
import Card from "./Card";
import { useSearch } from "../context/SearchContext";
import videoService from "../services/videoService";
import { formatTimeAgo } from "../utils/timeFormatter";

function Home({ columns = "sm:grid-cols-3", autoRows = "sm:auto-rows-[260px]", bgColor = "bg-[#1d232a]", cardLayout = "vertical" }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [timestamp, setTimestamp] = useState(null);
  
  const { searchResults, isSearching, searchQuery, clearSearch } = useSearch();
  
  const fetchVideos = useCallback(async (pageNum = 1, refresh = false) => {
    try {
      setLoading(true);
      const result = await videoService.getAllVideos(pageNum, 12);
      
      if (result.success) {
        const data = result.data;
        
        if (refresh) {
          setVideos(data.videos || []);
        } else {
          setVideos(prev => [...prev, ...(data.videos || [])]);
        }
        
        setHasMore(data.hasMore || false);
        setTimestamp(data.timestamp);
      } else {
        console.error("Error fetching videos:", result.message);
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setLoading(false);
    }
  }, []);
  
  // Initial load
  useEffect(() => {
    if (!isSearching) {
      fetchVideos(1, true);
    }
  }, [fetchVideos, isSearching]);
  
  // Refresh every minute, but only if not searching
  useEffect(() => {
    if (!isSearching) {
      const interval = setInterval(() => {
        fetchVideos(1, true);
      }, 60000); // 1 minute
      
      return () => clearInterval(interval);
    }
  }, [fetchVideos, isSearching]);

  const loadMore = () => {
    if (hasMore && !loading && !isSearching) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchVideos(nextPage);
    }
  };

  // Determine which videos to display
  const displayVideos = isSearching ? searchResults : videos;
  
  return (
    <div className={`${bgColor} flex flex-col min-h-full`}
          style={{
        background:
          "radial-gradient(ellipse 100% 100% at 50% 30%, rgba(70, 192, 141, 0.25), transparent 70%), #000000",
      }}
>
      {/* Search results indicator */}
      {isSearching && searchResults.length > 0 && (
        <div className="flex justify-between items-center px-8 pt-4">
          <div className="text-white">
            <span className="font-semibold">Search results for: </span>
            <span className="italic">"{searchQuery}"</span>
            <span className="ml-2 text-sm">({searchResults.length} results)</span>
          </div>
          <button 
            onClick={clearSearch}
            className="btn btn-sm btn-outline"
          >
            Clear Search
          </button>
        </div>
      )}
      
      {/* No search results message */}
      {isSearching && searchResults.length === 0 && (
        <div className="text-white text-center py-6">
          <h3 className="text-xl">No matching videos found"{searchQuery}"</h3>
          <button 
            onClick={clearSearch}
            className="btn btn-sm btn-outline mt-4"
          >
            Show All Videos
          </button>
        </div>
      )}

  <div className={`grid ${columns} ${cardLayout === 'horizontal' ? 'gap-y-8' : 'gap-y-2'} pl-8 pr-4 pt-8 ${autoRows} auto-rows-[300px]`}> 
        <style>
          {`
            .appear {
              animation: popup 0.4s ease-in;
              animation-timeline: view();
              animation-range: entry 0% 30%;
              transform-origin: left bottom;
            }
            @keyframes popup {
              from {
                opacity: 0.2;
                scale: 0.8;
              }
              to {
                opacity: 1;
                scale: 1;
              }
            }
          `}
        </style>
        {displayVideos.length === 0 && !loading ? (
          <div className="text-white text-center col-span-full">No videos available.</div>
        ) : (
          displayVideos.map((video) => (
            <div key={video._id} className="appear">
              <Card
                layout={cardLayout}
                image={video.thumbnail}
                title={video.title}
                views={video.views.endsWith(" Views") ? video.views : `${video.views} Views`}
                time={formatTimeAgo(video.createdAt)}
                authorName={video.owner?.fullName || "Unknown"}
                authorAvatar={video.owner?.avatar || "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"}
                videoId={video._id}
              />
            </div>
          ))
        )}
      </div>
      
      {/* Load more button - only show when not searching */}
      {hasMore && videos.length > 0 && !isSearching && (
        <div className="flex justify-center my-6">
          <button 
            onClick={loadMore}
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
      
      {/* Initial loading indicator */}
      {loading && displayVideos.length === 0 && (
        <div className="text-white text-center py-10">Loading videos...</div>
      )}
    </div>
  );
}

export default Home;
