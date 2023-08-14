import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import styles from './ProfileDisplay.module.css';
import SideNav from '../HomeScreens/SideNav';
// import log from '../../assets/check1.jpg';
import DocProfile from './DocProfile';
import PatientProfile from './PatientProfile';

const ProfileDisplay = () => {
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);

  const [group] = useCookies(['myGroup'])

  return (
    <div className={styles.container}>
      <div className={`${styles.sidebar} ${isSidebarExpanded ? styles.expanded : ''}`}>
        <SideNav />
      </div>
      <div className={`${styles.content} ${isSidebarExpanded ? styles.expanded : ''}`}>
        {group.group === 'PATIENT' ? <PatientProfile /> : <DocProfile />}
      </div>
    </div>
  );
};

export default ProfileDisplay;
