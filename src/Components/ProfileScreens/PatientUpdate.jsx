import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import styles from './PatientUpdate.module.css';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../APIContext';
import SideNav from '../HomeScreens/SideNav';

const PatientUpdate = () => {
  const [token] = useCookies(['myToken']);
  const [id] = useCookies(['myId']);
  const [profileData, setProfileData] = useState({
    full_name: 'Male',
    gender: '',
    phone_number: '',
    address: '',
    dob: ''
  });
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
        } else {
          console.log('Failed to fetch profile');
        }
      } catch (error) {
        console.log('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [token, id]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/patient-profiles/${id.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.access_token}`,
        },
        body: JSON.stringify(profileData),
      });

      alert('Profile updated successfully');
    } catch (error) {
      console.log('Error updating profile:', error);
    }
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setProfileData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className={styles.container}>
      <SideNav />
      {profileData && (
        <form className={styles.form}>
        <h3 className={styles.h2}>Edit Profile</h3>
          <div className={styles.formGroup}>
            <label>Full Name</label>
            <input
              type="text"
              name="full_name"
              value={profileData.full_name}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Gender</label>
            <select
              name="gender"
              value={profileData.gender}
              onChange={handleInputChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Phone Number</label>
            <input
              type="text"
              name="phone_number"
              value={profileData.phone_number}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={profileData.address}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={profileData.dob}
              onChange={handleInputChange}
            />
          </div>
          <button className={styles.updateButton} onClick={handleUpdate}>
            Update Profile
          </button>
        </form>
      )}
    </div>
  );
};

export default PatientUpdate;
