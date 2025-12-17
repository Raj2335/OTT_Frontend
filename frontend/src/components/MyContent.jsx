import React from 'react';
import ProfileBanner from './ProfileBanner';
import Error from './Error';
import { useAuth } from '../context/AuthContext';

function MyContent() {
  const { isAuthenticated, isLoading, user } = useAuth();
  
  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }
  
  // Show Error component if not authenticated or no user (same as Support page)
  if (!isAuthenticated || !user) {
    return <Error />;
  }
  
  return <ProfileBanner />;
}

export default MyContent;