import React, { useState } from 'react';
import './ImageUpload.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [coordinates, setCoordinates] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64EncodedImage = reader.result.split(',')[1]; // Get base64 encoded string
      setImage(base64EncodedImage);
    };
    reader.readAsDataURL(file);
  };

  const handleCoordinateChange = (e) => {
    setCoordinates(e.target.value);
  };

  const handleSubmit = async () => {
    if (!image || !coordinates) {
      console.error('Please upload an image and provide coordinates.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/process-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image, coordinates }),
      });

      if (response.ok) {
        console.log('Image uploaded and processed successfully.');
        // Handle success
      } else {
        console.error('Failed to upload image:', response.statusText);
        // Handle error
      }
    } catch (error) {
      console.error('Error uploading image:', error.message);
      // Handle error
    }
  };

  return (
    <div>
      <div className="empty"></div>
      <div className="image-upload-container">
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
      </div>
    </div>
  );
};

export default ImageUpload;
