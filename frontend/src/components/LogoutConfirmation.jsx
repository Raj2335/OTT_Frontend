import React from 'react';

const LogoutConfirmation = ({ isVisible, onConfirm, onCancel, isLoggingOut = false }) => {
  if (!isVisible) return null;

  return (
    <div className="absolute right-0 mt-2 bg-gray-800 rounded-lg shadow-lg p-4 w-72 z-50">
      <h3 className="text-white text-sm font-semibold mb-2">Confirm Logout</h3>
      <p className="text-gray-300 text-xs mb-4">
        Are you sure you want to logout? You will need to sign in again to access your account.
      </p>
      <div className="flex justify-end gap-2">
        <button 
          className="px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700 transition-colors"
          onClick={onCancel}
          disabled={isLoggingOut}
        >
          Cancel
        </button>
        <button 
          className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
          onClick={onConfirm}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? 'Logging out...' : 'Yes, Logout'}
        </button>
      </div>
    </div>
  );
};

export default LogoutConfirmation;
