import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser, faUserDoctor, faCog, faSignOutAlt, faBars } from '@fortawesome/free-solid-svg-icons';
import styles from './SideNav.module.css';
import log from '../../assets/images/logo.gif';
import { useCookies } from 'react-cookie';


const SideNav = () => {
  const location = useLocation();
  const [token, , removeToken] = useCookies(['myToken']);
  const [group, , removeGroup] = useCookies(['myGroup']);
  const navigate = useNavigate();

  const logoutSubmitted = () => {
    removeToken('myToken');
    removeGroup('myGroup');
    navigate('/');
  };



  return (
    <div className={styles.sidebar}>
      <div className={styles.userAccount}>
        <img src={log} alt="Login" height="100%" width="100%" />
        <h2>EyeCare</h2>
      </div>
      <ul className={styles.links}>
        <hr className={styles.hr} />
        <li className={location.pathname === '/home' ? styles.active : ''}>
          <FontAwesomeIcon icon={faHouse} className={styles.icon}/>
          <Link to="/home" className={styles.link}>Dashboard</Link>
        </li>
        <hr className={styles.hr} />
        <li className={location.pathname === '/profile' ? styles.active : ''}>
          <FontAwesomeIcon icon={faUser} className={styles.icon}/>
          <Link to="/profile" className={styles.link}>Profile</Link>
        </li>
        <hr className={styles.hr} />
        <li className={location.pathname === '/doctors' ? styles.active : ''}>
          <FontAwesomeIcon icon={faUserDoctor} className={styles.icon}/>
          <Link to="/doctors" className={styles.link}>In-house Doctors</Link>
        </li>
        <hr className={styles.hr} />
        {group.group === 'PATIENT' ? <li className={location.pathname === '/overview' ? styles.active : ''}>
          <FontAwesomeIcon icon={faBars} className={styles.icon}/>
          <Link to="/overview" className={styles.link}>Overview</Link>
        </li> : <li className={location.pathname === '/my-patients' ? styles.active : ''}>
          <FontAwesomeIcon icon={faBars} className={styles.icon}/>
          <Link to="/my-patients" className={styles.link}>My Patients</Link>
        </li>}
        
        <hr className={styles.hr} />
        <li className={location.pathname === '/setting' ? styles.active : ''}>
          <FontAwesomeIcon icon={faCog} className={styles.icon}/>
          <Link to="/setting" className={styles.link}>Settings</Link>
        </li>
        <hr className={styles.hr} />
        <hr className={styles.hr} />
        <hr className={styles.hr} />
        <li className={styles.logout}>
          <FontAwesomeIcon icon={faSignOutAlt} className={styles.icon}/>
          <button onClick={logoutSubmitted} className={styles.logoutButton}>Logout</button>
        </li>
        <hr className={styles.hr} />
        <hr className={styles.hr} />
        <hr className={styles.hr} />
      </ul>
    </div>
  );
};

export default SideNav;
