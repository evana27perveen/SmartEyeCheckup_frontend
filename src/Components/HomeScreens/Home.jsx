import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import SideNav from './SideNav';
import InfoCard from './InfoCard';
import log from '../../assets/images/check1.jpg';
import { useCookies } from 'react-cookie';
import API_BASE_URL from '../APIContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);
  const [token] = useCookies(['myToken']);
  const [group] = useCookies(['myGroup']);
  const [id, setId] = useCookies(['myId'])
  const [doctors, setDoctors] = useState(0);
  const [patients, setPatients] = useState(0);
  const [checkups, setCheckups] = useState(0);

  const navigate = useNavigate();


  useEffect(() => {
    fetchData();
  }, [token]);



  const fetchData = async () => {
            try {
              const response = await fetch(`${API_BASE_URL}/api/user-home-data/`, {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token.access_token}`,
                },
              });
              const data = await response.json();
        
              if (data !== null) {
                setId('id', data.p_id);
                setDoctors(data.doctors);
                setPatients(data.patients);
                setCheckups(data.checkups)
              }
            } catch (error) {
              console.log('Error fetching data:', error);
            }
          };

          const handleCheckEyesClick = () => {
            navigate('/checkup-create');
          };

  return (
    <div className={styles.container}>
      <div className={`${styles.sidebar} ${isSidebarExpanded ? styles.expanded : ''}`}>
        <SideNav />
      </div>
      <div className={`${styles.content} ${isSidebarExpanded ? styles.expanded : ''}`}>
        <div className={styles.cardcontent}>
          <InfoCard title="Total Patients" value={patients} color="#4682B4" />
          <InfoCard title="Checkups till Date" value={checkups} color="#011e3d" />
          <InfoCard title="Doctors Available" value={doctors} color="#2F4F4F" />
        </div>
        <div className={styles.cardcontent}>
        <div className={styles.imageColumn}>
                    <img src={log} alt="Login" height="350px" width="600px" />
                </div>
                {group.group === 'PATIENT' && 
          <button className={styles.checkButton} onClick={handleCheckEyesClick}>
            Check My Eyes
          </button>}
        </div>
      </div>
    </div>
  );
};

export default Home;
