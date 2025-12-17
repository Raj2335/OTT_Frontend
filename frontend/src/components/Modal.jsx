import React, { useState, useRef } from 'react'
import { MessageCircleX, Upload } from 'lucide-react'
import videoService from '../services/videoService'

function Modal({ onClose, onUploadSuccess }) {
  const [errorMsg, setErrorMsg] = useState('')
  const [videoFile, setVideoFile] = useState(null)
  const [thumbnailFile, setThumbnailFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  const videoInputRef = useRef(null)
  const thumbnailInputRef = useRef(null)

  const allowedVideoTypes = ['video/mp4', 'video/webm']
  const allowedThumbnailTypes = ['image/jpeg', 'image/png']

  const validateVideo = (file) => {
    if (!allowedVideoTypes.includes(file.type)) {
      setErrorMsg('Only .mp4 and .webm video files are allowed')
      setVideoFile(null)
    } else {
      setErrorMsg('')
      setVideoFile(file)
    }
  }

  const validateThumbnail = (file) => {
    if (!allowedThumbnailTypes.includes(file.type)) {
      setErrorMsg('Only .jpg, .jpeg, .png files allowed')
      setThumbnailFile(null)
    } else {
      setErrorMsg('')
      setThumbnailFile(file)
    }
  }

  const handleDropVideo = (e) => {
    e.preventDefault()
    if (isUploading) return; // Prevent file changes during upload
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) validateVideo(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    if (isUploading) return; // Prevent drag over during upload
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    if (isUploading) return; // Prevent drag leave during upload
    setIsDragging(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isUploading) {
      return;
    }
    
    if (!videoFile) {
      setErrorMsg('Please select a video file');
      return;
    }
    if (!thumbnailFile) {
      setErrorMsg('Please select a thumbnail file');
      return;
    }
    if (!title.trim()) {
      setErrorMsg('Please enter a title');
      return;
    }
    
    // Check title character count (excluding spaces)
    const charCount = title.replace(/\s+/g, '').length;
    if (charCount > 35) {
      setErrorMsg('Title cannot exceed 35 characters');
      return;
    }
    
    setIsUploading(true);
    setErrorMsg(''); // Clear any previous errors
    
    const formData = new FormData();
    formData.append('videoFile', videoFile);
    formData.append('thumbnail', thumbnailFile);
    formData.append('title', title);
    
    try {
      const result = await videoService.uploadVideo(formData);
      
      if (result.success) {
        // If a callback was provided, call it with the new video
        if (onUploadSuccess && result.data) {
          onUploadSuccess(result.data);
        }
        onClose();
      } else {
        setErrorMsg(result.message || 'Upload failed. Please try again.');
      }
    } catch (err) {
      console.error("Upload error:", err);
      setErrorMsg('An unexpected error occurred. Please try again.');
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/75 backdrop-blur-md flex justify-center items-center"
    >
      <div className="flex flex-col gap-1 text-white">
        <button
          onClick={!isUploading ? onClose : undefined}
          disabled={isUploading}
          className={`place-self-end cursor-pointer relative left-4 top-1 transition-opacity ${
            isUploading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <MessageCircleX size={24} />
        </button>

        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-black rounded-lg px-8 py-8 flex flex-col gap-4 items-center w-[430px] border border-gray-700"
        >
          {/* Video Upload */}
          <div
            className={`border-2 border-dashed p-8 flex flex-col items-center gap-2 rounded-lg w-full transition-colors ${
              isUploading
                ? 'border-gray-500 opacity-50 cursor-not-allowed'
                : isDragging
                ? 'border-purple-400 bg-purple-500/10'
                : videoFile
                ? 'border-green-400 bg-green-500/10'
                : 'border-gray-500'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDropVideo}
          >
            {videoFile ? (
              <p className="text-lg text-center">{videoFile.name}</p>
            ) : (
              <>
                <div className="bg-purple-400 rounded-full p-3">
                  <Upload size={28} />
                </div>
                <p className="text-xs font-semibold text-center">
                  Drag & drop video files
                </p>
                <p className="text-xs text-center text-gray-400">
                  (max 100MB)
                </p>
              </>
            )}
            <button
              type="button"
              disabled={isUploading}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                isUploading 
                  ? 'bg-gray-500 cursor-not-allowed' 
                  : 'bg-purple-500 hover:bg-purple-600'
              }`}
              onClick={() => !isUploading && videoInputRef.current.click()}
            >
              Select Files
            </button>
            <input
              type="file"
              accept="video/mp4,video/webm"
              ref={videoInputRef}
              disabled={isUploading}
              onChange={(e) => {
                if (isUploading) return;
                const file = e.target.files[0]
                if (file) validateVideo(file)
              }}
              className="hidden"
            />
          </div>

          {/* Thumbnail Upload */}
          <label className="flex flex-col gap-1 text-sm w-full">
            Thumbnail*
            <div className="flex items-center border border-gray-500 rounded-md overflow-hidden">
              <button
                type="button"
                disabled={isUploading}
                className={`text-white px-4 py-2 text-xs font-medium transition-colors ${
                  isUploading 
                    ? 'bg-gray-500 cursor-not-allowed' 
                    : 'bg-purple-500 hover:bg-purple-600'
                }`}
                onClick={() => !isUploading && thumbnailInputRef.current.click()}
              >
                Choose Files
              </button>
              <span className="px-2 py-2 text-xs text-gray-300 truncate">
                {thumbnailFile ? thumbnailFile.name : 'no file selected'}
              </span>
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                ref={thumbnailInputRef}
                disabled={isUploading}
                onChange={(e) => {
                  if (isUploading) return;
                  const file = e.target.files[0]
                  if (file) validateThumbnail(file)
                }}
                className="hidden"
              />
            </div>
          </label>

          {/* Form */}
          <form
            className="w-full flex flex-col gap-2"
            onSubmit={handleSubmit}
          >
            <label className="flex flex-col gap-1 text-xs">
              Title* (max 35 characters)
              <input
                type="text"
                value={title}
                disabled={isUploading}
                onChange={(e) => {
                  if (isUploading) return; // Prevent changes during upload
                  setTitle(e.target.value);
                  // Reset title error when user edits
                  if (titleError) setTitleError('');
                  
                  // Validate character count as user types (excluding spaces)
                  const charCount = e.target.value.replace(/\s+/g, '').length;
                  if (charCount > 35) {
                    setTitleError(`Title too long: ${charCount}/35 characters (excluding spaces)`);
                  } else {
                    setTitleError('');
                  }
                }}
                className={`bg-transparent border rounded-md px-2 py-2 text-xs transition-colors ${
                  titleError ? 'border-red-500' : 'border-gray-500'
                } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                required
              />
              {titleError && (
                <span className="text-[10px] text-red-400 mt-1">{titleError}</span>
              )}
            </label>

            {errorMsg && (
              <span className="text-[10px] text-red-400 mt-1">{errorMsg}</span>
            )}

            {isUploading && (
              <div className="text-[10px] text-blue-400 mt-1 text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-400"></div>
                  Uploading video, please wait...
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isUploading}
              className={`px-2 py-2 rounded-md text-xs font-semibold mt-2 transition-colors ${
                isUploading 
                  ? 'bg-gray-500 cursor-not-allowed' 
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {isUploading ? 'Uploading...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Modal
