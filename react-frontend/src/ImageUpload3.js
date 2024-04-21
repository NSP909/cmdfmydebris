import React, { useState, useRef } from 'react';
import './ImageUpload2.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';


const ImageUpload3 = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const res="";

  const imageRef = useRef(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    console.log("Uploading image", file);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("http://127.0.0.1:5000/get-house", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to upload image");
      }
      const data = await response.json();
      setImageUrl(URL.createObjectURL(file));
      setResult(data);
      setError(null);
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Error uploading image. Please try again.");
      setImageUrl(null);
      setResult(null);
    }
  };


 const removeLines = (text)=>{
    const response = text.response;

    return response
 }
  return (
    <div>
      <div className="flex flex-col justify-center items-center pt-[10vh]">
        <p className="text-4xl font-extrabold leading-none tracking-tight dark:text-white mb-10">
          Debris Detector
        </p>
        <p className="text-center max-w-[55vw] mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
          Upload an image of the house or building yoy want to analyze
        </p>
        <div className="upload-input-container mt-10">
          <label
            htmlFor="img"
            className="flex items-center justify-center text-white h-[8vh] w-[20vw] bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 rounded-lg text-2xl dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800 cursor-pointer"
          >
            <FontAwesomeIcon
              icon={faCloudUploadAlt}
              className="upload-icon mr-2"
            />
            Upload Image
            <input
              type="file"
              name="img"
              accept="image/*"
              id="img"
              onChange={handleImageChange}
              className="hidden"
              required
            />
          </label>
        </div>
        {imageUrl && (
          <div className="flex flex-col justify-center items-center mt-10">
            <img src={imageUrl} alt="Uploaded Image" className="max-w-[35vw] max-h-[40vh]" />
          </div>
        )}
        {result && (
          <div className="mt-4 text-gray-500 dark:text-gray-400">
            <p> {removeLines(result)}</p>
          </div>
        )}
        {error && (
          <div className="mt-4 text-red-500 dark:text-red-400">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload3;
