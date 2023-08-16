import React, { useState, useEffect } from 'react';
import styles from './MyPatients.module.css';
import SideNav from '../HomeScreens/SideNav';
import { useCookies } from 'react-cookie';
import API_BASE_URL from '../APIContext';

const MyPatients = () => {
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);
  const [token] = useCookies(['myToken']);
  const [checkups, setCheckups] = useState([]);

  useEffect(() => {
    // Fetch checkup data
    fetch(`${API_BASE_URL}/api/eye-data/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token.access_token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setCheckups(data.checkups))
      .catch((error) => console.error('Error fetching checkup data:', error));
  }, [token]);

  const fetchPatientInfo = async (patientID) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/patient-profiles/${patientID}/`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token.access_token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data; 
      } else {
        console.error('Error fetching doctor data:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Error fetching doctor data:', error);
      return null;
    }
  };

  const PatientInfo = ({ patientID }) => {
    const [patientInfo, setPatientInfo] = useState(null);
  
    useEffect(() => {
      fetchPatientInfo(patientID).then((data) => {
        if (data) {
          setPatientInfo(data);
        }
      });
    }, [patientID]);
  
    if (!patientInfo) {
      return null;
    }
  
    return <div>
    <p>{patientInfo.full_name}</p>
    <small>{patientInfo.phone_number}</small>
    </div>; 
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.sidebar} ${isSidebarExpanded ? styles.expanded : ''}`}>
        <SideNav />
      </div>
      <div className={`${styles.content} ${isSidebarExpanded ? styles.expanded : ''}`}>
        <div className={styles.content}>
          <h2 className={styles.h2}>Checkup Overview</h2>
          <table className={styles.checkupTable}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Eye</th>
                <th>Detected Result</th>
                <th>Patient</th>
              </tr>
            </thead>
            <tbody>
              {checkups.map((checkup) => (
                <tr key={checkup.id}>
                  <td>{checkup.date}</td>
                  <td>
                    <img
                        src={checkup.eye_vision}
                        alt="eye"
                        height="150px"
                        width="200px"
                    />
                  </td>
                  <td>{checkup.predicted_result}</td>
                  <td>
                      <PatientInfo patientID={checkup.patient} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyPatients;
