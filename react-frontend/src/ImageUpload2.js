import React, { useState, useRef } from 'react';
import './ImageUpload2.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

const ImageUpload2 = () => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const videoRef = useRef(null);

  const handleVideoChange = async (e) => {
    const file = e.target.files[0];

    console.log("Uploading video", file);

    setIsProcessing(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:5000/post-data", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload video");
      }

      const blob = await response.blob();
      const video = URL.createObjectURL(blob);
      console.log("Video URL:", video); // Add this line to check the video URL
      videoRef.current.src = video; // Update this line to set src attribute directly

      setVideoUrl(video);
      setIsProcessing(false);
    } catch (error) {
      console.error("Error uploading video:", error);
      setIsProcessing(false);
    }
  };

  const handleSubmit = async () => {
    if (!videoUrl) {
      console.error('Please upload a video.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/post-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoUrl }),
      });

      if (response.ok) {
        console.log('Video uploaded and processed successfully.');
        // Handle success
      } else {
        console.error('Failed to upload video:', response.statusText);
        // Handle error
      }
    } catch (error) {
      console.error('Error uploading video:', error.message);
      // Handle error
    }
  };

  return (
    <div className="image-upload-container">
      <h2 className="upload-title">Upload Your Video</h2>
      <div className="upload-input-container">
        <label htmlFor="upload-video-input" className="upload-label">
          <input
            type="file"
            accept="video/*"
            id="upload-video-input"
            onChange={handleVideoChange}
            className="upload-input"
          />
          <FontAwesomeIcon icon={faCloudUploadAlt} className="upload-icon" />
          Choose Video
        </label>
      </div>
      {isProcessing && <p>Uploading video...</p>}
      {videoUrl && (
        <div className="image-preview">
          <h3 className="preview-title">Video Preview</h3>
          <video ref={videoRef} controls className="preview-image">
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      <button onClick={handleSubmit} className="submit-button">Submit</button>
    </div>
  );
};

export default ImageUpload2;
