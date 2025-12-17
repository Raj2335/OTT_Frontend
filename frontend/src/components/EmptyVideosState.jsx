import React from 'react';

const EmptyVideosState = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
      <div className="w-32 h-32 mb-6 text-gray-400 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
        </svg>
      </div>
      <h3 className="text-2xl font-semibold text-white mb-2">No videos yet</h3>
      <p className="text-gray-400 mb-6 max-w-md">
        You haven't uploaded any videos to your profile yet. Click the Upload button to add your first video.
      </p>
      <p className="text-sm text-gray-500">
        Share your creativity with the world!
      </p>
    </div>
  );
};

export default EmptyVideosState;
