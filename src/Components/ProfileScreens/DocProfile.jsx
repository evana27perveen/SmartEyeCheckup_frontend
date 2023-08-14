import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import styles from './DocProfile.module.css';
import log from '../../assets/docP.png';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../APIContext';

const DocProfile = () => {
  const [token] = useCookies(['myToken']);
  const [id] = useCookies(['myId'])
  const [profileData, setProfileData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/doctor-profiles/${id.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.access_token}`,
          },
        });

        if (response.ok) {
          const result = await response.json(); // Parse the JSON response
          setProfileData(result); // Set the parsed JSON data
          console.log(result); // Log the parsed data
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
            <img src={log} alt="Doctor" height="250px" width="400px" />
            <h2>{profileData.full_name}</h2>
            <p className={styles.specialization}>{profileData.specialization}</p>
          </div>
          <div className={styles.details}>
            <p className={styles.detail}>
              <span>{profileData.gender}</span>
            </p>
            <p className={styles.detail}>
              Phone Number: <span>{profileData.phone_number}</span>
            </p>
            <p className={styles.detail}>
              Verified: <span>{profileData.verified ? 'Yes' : 'No'}</span>
            </p>
          </div>
          <button className={styles.checkButton} onClick={() => navigate('/doctor-update')}>
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default DocProfile;
