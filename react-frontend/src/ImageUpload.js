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

  // const handleCoordinateChange = (e) => {
  //   setCoordinates(e.target.value);
  // };

  // const handleSubmit = async () => {
  //   if (!image || !coordinates) {
  //     console.error('Please upload an image and provide coordinates.');
  //     return;
  //   }

  //   try {
  //     const response = await fetch('http://127.0.0.1:5000/process-image', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ image, coordinates }),
  //     });

  //     if (response.ok) {
  //       console.log('Image uploaded and processed successfully.');
  //       // Handle success
  //     } else {
  //       console.error('Failed to upload image:', response.statusText);
  //       // Handle error
  //     }
  //   } catch (error) {
  //     console.error('Error uploading image:', error.message);
  //     // Handle error
  //   }
  // };

  return (
    <div>
      <div className="empty"></div>
      {/* <div className="image-upload-container">
        <h2 className="upload-title">Upload Your Image</h2>
        <div className="upload-input-container">
          <label htmlFor="upload-input" className="upload-label">
            <input
              type="file"
              accept="image/*"
              id="upload-input"
              onChange={handleImageChange}
              className="upload-input"
            />
            <FontAwesomeIcon icon={faCloudUploadAlt} className="upload-icon" />
            Choose Image
          </label>
        </div>
        <div className="coordinate-input-container">
          <label htmlFor="coordinate-input" className="coordinate-label">
            Coordinates:
            <input
              type="text"
              id="coordinate-input"
              value={coordinates}
              onChange={handleCoordinateChange}
              className="coordinate-input"
            />
          </label>
        </div>
        {image && (
          <div className="image-preview">
            <h3 className="preview-title">Preview</h3>
            <img src={`data:image/jpeg;base64,${image}`} alt="Uploaded" className="preview-image" />
          </div>
        )}
        <button onClick={handleSubmit} className="submit-button">Submit</button>
      </div> */}
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
