import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import styles from './PatientProfile.module.css';
import log from '../../assets/images/ptnP.png';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../APIContext';

const PatientProfile = () => {
  const [token] = useCookies(['myToken']);
  const [id] = useCookies(['myId'])
  const [profileData, setProfileData] = useState(null);
  let navigate = useNavigate();


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/patient-profiles/${id.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.access_token}`,
          },
        });

        if (response.ok) {
          const result = await response.json(); 
          setProfileData(result); 
          console.log(result); 
        } else {
          console.log('Failed to fetch profile');
        }
      } catch (error) {
        console.log('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [token, id]); // Include 'id' in the dependency array

  return (
    <div className={styles.container}>
      {profileData && (
        <>
          <div className={styles.header}>
            <img src={log} alt="Doctor" height="300px" width="400px" />
            <h2>{profileData.full_name}</h2>
          </div>
          <div className={styles.details}>
            <p className={styles.detail}>
              <span>{profileData.gender}</span>
            </p>
            <p className={styles.detail}>
              Phone Number: <span>{profileData.phone_number}</span>
            </p>
            <p className={styles.detail}>
              Address: <span>{profileData.address}</span>
            </p>
            <p className={styles.detail}>
              Date of Birth: <span>{profileData.dob}</span>
            </p>
          </div>
          <button className={styles.checkButton} onClick={() => navigate('/patient-update')}>
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default PatientProfile;
