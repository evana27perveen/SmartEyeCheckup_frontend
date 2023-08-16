import React, { useState } from 'react';
import styles from './CheckupCreate.module.css';
import SideNav from '../HomeScreens/SideNav';
import Form from './Form';

const CheckupCreate = () => {
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);




  return (
    <div className={styles.container}>
      <div className={`${styles.sidebar} ${isSidebarExpanded ? styles.expanded : ''}`}>
        <SideNav />
      </div>
      <div className={`${styles.content} ${isSidebarExpanded ? styles.expanded : ''}`}>
        <Form/>
      </div>
    </div>
  );
};

export default CheckupCreate;
