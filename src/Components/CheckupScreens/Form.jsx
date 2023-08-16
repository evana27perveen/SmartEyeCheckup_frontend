import React, { useState } from "react";
import API_BASE_URL from '../APIContext';
import styles from './Form.module.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function Form() {
  const [token] = useCookies(['myToken']);
  const [id] = useCookies(['myId'])
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const navigate = useNavigate();

  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);

      const response = await fetch(`${API_BASE_URL}/api/upload/`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        console.error("Error uploading image:", response.status);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSendToDoctor = async () => {
    try {
      const formData = new FormData();
      formData.append("patient", id.id);
      formData.append("eye_vision", image); // Assuming 'image' is a Blob or File object
      formData.append("predicted_result", result.class);
  
      const response = await fetch(`${API_BASE_URL}/api/checkups/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token.access_token}`,
        },
        body: formData,
      });
  
      if (response.ok) {
        navigate('/home');
      } else {
        console.error("Error creating checkup:", response.status);
      }
    } catch (error) {
      console.error("Error creating checkup:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1 className={styles.h1}>Eye Cataract Detection</h1>
        {!result && (
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <button className={styles.button} onClick={handleImageUpload}>
              Check
            </button>
          </div>
        )}
        {result && (
          <div className={styles.div1}>
            <div className={styles.div2}>
              <img
                src={URL.createObjectURL(image)}
                alt="eye"
                height="150px"
                width="200px"
              />
            </div>
            <div className={styles.div2}>
              <p className={styles.pred}>Result: {result.class}</p>
            </div>
            <div className={styles.div2}>
              <button className={styles.button} onClick={handleSendToDoctor}>
                Send to Doctor
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Form;
