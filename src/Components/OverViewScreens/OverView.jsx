import React, { useState, useEffect } from 'react';
import styles from './OverView.module.css';
import SideNav from '../HomeScreens/SideNav';
import { useCookies } from 'react-cookie';
import API_BASE_URL from '../APIContext';
import { useNavigate } from 'react-router-dom';

const OverView = () => {
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);
  const [token] = useCookies(['myToken']);
  const [checkups, setCheckups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch checkup data
    fetch(`${API_BASE_URL}/api/checkup-data/`, {
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

  const fetchDoctorInfo = async (doctorId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/doctor-profiles/${doctorId}/`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token.access_token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data; // Return doctor data
      } else {
        console.error('Error fetching doctor data:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Error fetching doctor data:', error);
      return null;
    }
  };

  const DoctorInfo = ({ doctorId }) => {
    const [doctorInfo, setDoctorInfo] = useState(null);
  
    useEffect(() => {
      fetchDoctorInfo(doctorId).then((data) => {
        if (data) {
          setDoctorInfo(data);
        }
      });
    }, [doctorId]);
  
    if (!doctorInfo) {
      return null;
    }
  
    return <div>{doctorInfo.full_name}</div>; // Display doctor's name, adjust property accordingly
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
                <th>Detected Result</th>
                <th>Assigned Doctor</th>
              </tr>
            </thead>
            <tbody>
              {checkups.map((checkup) => (
                <tr key={checkup.id}>
                  <td>{new Date(checkup.date).toLocaleDateString('en-GB')}   at   {new Date(checkup.date).toLocaleTimeString()}</td>
                  <td>{checkup.predicted_result}</td>
                  <td>
                    {checkup.assigned_doctor && (
                      <DoctorInfo doctorId={checkup.assigned_doctor} />
                    )}
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

export default OverView;
