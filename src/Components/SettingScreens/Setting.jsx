import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import styles from './Setting.module.css';
import SideNav from '../HomeScreens/SideNav';
// import log from '../../assets/check1.jpg';
import DoctorUpdate from '../ProfileScreens/DoctorUpdate';
import PatientUpdate from '../ProfileScreens/PatientUpdate';

const Setting = () => {
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);

  const [group] = useCookies(['myGroup'])
  

  return (
    <div>
      {group.group === 'PATIENT' ? <PatientUpdate /> : <DoctorUpdate />}
    </div>
  );
};

export default Setting;
