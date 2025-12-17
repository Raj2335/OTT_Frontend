import React from 'react';
import UserVideos from "./UserVideos";
import EmptyVideosState from './EmptyVideosState';

export default function VideosTab({ videos, onVideoDelete }) {
  // If there are no videos, show the empty state component
  if (!videos || videos.length === 0) {
    return <EmptyVideosState />;
  }
  
  // Otherwise show the videos
  return (
    <UserVideos videos={videos} onVideoDelete={onVideoDelete} />
  );
}
