import React from 'react';
import styles from './InfoCard.module.css';

const InfoCard = ({ title, value, color }) => {
  const cardStyle = {
    backgroundColor: color,
  };

  return (
    <div className={styles.infoCard} style={cardStyle}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.value}>{value}</p>
    </div>
  );
};

export default InfoCard;
