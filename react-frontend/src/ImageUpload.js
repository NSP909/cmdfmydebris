// ImageUpload.js

import React, { useState, useRef} from 'react';
import './ImageUpload.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const videoRef = useRef(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleVideoChange = async (e) => {
    const file = e.target.files[0];
    setFileName(e.target.files[0].name);

    console.log("Uploading video", file);

    setIsProcessing(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      // Send the POST request to your custom API
      const response = await fetch("http://127.0.0.1:5000/detect-person", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload video");
      }

      // Assuming the API response contains the URL of the uploaded video
      console.log(response)
      const blob = await response.blob();
      const video = URL.createObjectURL(blob);
      videoRef.current = video;
      console.log(videoRef.current)

      // Update the state with the video URL
      setVideoUrl(video);

      setIsProcessing(false);
    } catch (error) {
      console.error("Error uploading video:", error);
      // Handle error state here (if needed)
      setIsProcessing(false);
    }
  };

  return (
    <div>
    <div classname="empty">
     



     
    </div>
    <div className="image-upload-container">
      <h2 className="upload-title">Upload Your Image</h2>
      <div className="upload-input-container">
        <label htmlFor="upload-input" className="upload-label">
          <input
            type="file"
            
            accept="image/*,video/*"
            id="upload-input"
            onChange={handleVideoChange}
            className="upload-input"
          />
          <FontAwesomeIcon icon={faCloudUploadAlt} className="upload-icon" />
          Choose Image
        </label>
      </div>
      {/* {videoUrl && (
        <div className="image-preview">
          <h3 className="preview-title">Preview</h3>
            <video src={videoUrl} controls className="preview-image" />
        </div>
      )} */}
      {videoUrl && (
        <video ref={videoRef} controls className="w-[80%] h-auto">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
    </div>
    
  );
};

export default ImageUpload;
