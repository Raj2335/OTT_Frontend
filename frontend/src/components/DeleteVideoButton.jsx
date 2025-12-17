import React, { useState } from 'react';
import { FaEllipsisV, FaTrash } from 'react-icons/fa';
import videoService from '../services/videoService';

const DeleteVideoButton = ({ videoId, onDelete }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    if (!videoId) return;
    
    try {
      setIsDeleting(true);
      const result = await videoService.deleteVideo(videoId);
      
      if (result.success) {
        // Call the parent's onDelete callback to update UI
        if (onDelete) {
          onDelete(videoId);
        }
      } else {
        console.error('Error deleting video:', result.message);
      }
      
      setIsDeleting(false);
      setShowDropdown(false);
      setShowConfirm(false);
    } catch (error) {
      console.error('Error deleting video:', error);
      setIsDeleting(false);
    }
  };

  const toggleDropdown = (e) => {
    e.stopPropagation(); // Prevent click from triggering parent elements
    setShowDropdown(!showDropdown);
    setShowConfirm(false);
  };

  const confirmDelete = (e) => {
    e.stopPropagation();
    setShowConfirm(true);
  };

  const cancelDelete = (e) => {
    e.stopPropagation();
    setShowConfirm(false);
  };

  return (
  <div className="absolute top-2 right-2 z-30" onClick={(e) => e.stopPropagation()}>
      <button 
        className="bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-2 rounded-full"
        onClick={toggleDropdown}
      >
        <FaEllipsisV />
      </button>
      
      {showDropdown && !showConfirm && (
  <div className="absolute right-0 mt-1 bg-gray-800 rounded shadow-lg w-32 py-1 z-30">
          <button 
            className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 flex items-center gap-2"
            onClick={confirmDelete}
          >
            <FaTrash className="text-red-500" />
            <span>Delete</span>
          </button>
        </div>
      )}
      
      {showConfirm && (
  <div className="absolute right-0 mt-1 bg-gray-800 rounded shadow-lg p-3 w-48 z-30">
          <p className="text-white text-sm mb-2">Are you sure you want to delete this video?</p>
          <div className="flex justify-between">
            <button 
              className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Yes, Delete'}
            </button>
            <button 
              className="px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700"
              onClick={cancelDelete}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteVideoButton;
