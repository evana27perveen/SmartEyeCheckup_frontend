import React, { useState, useEffect } from 'react';
import styles from './AllDoctors.module.css';
import SideNav from '../HomeScreens/SideNav';
import { useCookies } from 'react-cookie';
import API_BASE_URL from '../APIContext';

const AllDoctors = () => {
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);
  const [token] = useCookies(['myToken']);
  const [doctors, setDoctors] = useState(null);
  
  useEffect(() => {
    fetchData();
  });

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/doctor-data/`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.access_token}`,
        },
      });
      const data = await response.json();

      if (data !== null) {
        setDoctors(data.doctors);
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.sidebar} ${isSidebarExpanded ? styles.expanded : ''}`}>
        <SideNav />
      </div>
      <div className={`${styles.content} ${isSidebarExpanded ? styles.expanded : ''}`}>
        <h2 className={styles.h2}>Available Doctors</h2>
        {doctors ? (
          <table className={styles.doctorTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Specialization</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map(doctor => (
                <tr key={doctor.id}>
                  <td>{doctor.full_name}</td>
                  <td>{doctor.specialization}</td>
                  <td>{doctor.phone_number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading doctors...</p>
        )}
      </div>
    </div>
  );
};

export default AllDoctors;
