// ImageUpload.js

import React, { useState } from 'react';
import './ImageUpload.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

const ImageUpload = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
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
            accept="image/*"
            id="upload-input"
            onChange={handleImageChange}
            className="upload-input"
          />
          <FontAwesomeIcon icon={faCloudUploadAlt} className="upload-icon" />
          Choose Image
        </label>
      </div>
      {image && (
        <div className="image-preview">
          <h3 className="preview-title">Preview</h3>
          <img src={image} alt="Uploaded" className="preview-image" />
        </div>
      )}
    </div>
    </div>
  );
};

export default ImageUpload;
