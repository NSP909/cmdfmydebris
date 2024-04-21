import React, { useState, useRef } from 'react';
import './ImageUpload2.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

const ImageUpload2 = () => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [fileName, setFileName] = useState("");

  const videoRef = useRef(null);

  const handleVideoChange = async (e) => {
    const file = e.target.files[0];
    console.log("Uploading video", file);
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
      videoRef.current = video;
      setVideoUrl(video)
    } catch (error) {
      console.error("Error uploading video:", error);

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
    <div>
      <div className="flex flex-col justify-center items-center pt-[3vh]">
        <p className="text-4xl font-extrabold leading-none tracking-tight dark:text-white mb-10">
          Debris Detector
        </p>
        <p className="text-center max-w-[55vw]  font-light text-gray-500  md:text-lg lg:text-xl dark:text-gray-400">
          Upload a video file here. The video quantifies damage in the video. It is assumed that the video is real-time feed from a rescue/recon drone. We also assume that real-time spacial cooridnates are available. Please wait for a few seconds for the video to
          process.
        </p>
        <div className="upload-input-container mt-10">
          <label
            htmlFor="vid"
            className="flex items-center justify-center text-white h-[8vh] w-[20vw] bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 rounded-lg text-2xl dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800 cursor-pointer m-8"
          >
            <FontAwesomeIcon
              icon={faCloudUploadAlt}
              className="upload-icon mr-2"
            />
            Upload Video
            <input
              type="file"
              name="vid"
              accept="image/*,video/*"
              id="vid"
              onChange={handleVideoChange}
              className="hidden"
              required
            />
          </label>
        </div>
        {fileName && (
          <p className="mt-4 text-gray-500 dark:text-gray-400">CHOSEN FILE: {fileName}</p>
        )}
        {/* {videoUrl && (
          <div className="flex flex-col justify-center items-center mt-10">
          <video ref={videoRef} controls className="max-w-[35vw] max-h-[40vh]">
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ImageUpload2;
