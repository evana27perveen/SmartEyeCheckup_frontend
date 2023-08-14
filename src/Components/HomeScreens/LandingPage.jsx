import React from 'react';
import styles from './LandingPage.module.css';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className={styles['landing-page']}>

      <section className={styles.hero}>
        <div className={styles['hero-content']}>
          <h1>Smart Eye Checkup</h1>
          <p>Get Your Eyes Checked with Artificial Intelligence</p>
          <Link to="/login">
            <button className={styles['cta-button']}>Start Checkup</button>
          </Link>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.feature}>
          <h2>AI-Powered Diagnosis</h2>
          <p>Our advanced AI technology detects various eye problems with accuracy.</p>
        </div>
        <div className={styles.feature}>
          <h2>Convenient and Fast</h2>
          <p>No need for appointments. Get your results quickly from the comfort of your home.</p>
        </div>
        <div className={styles.feature}>
          <h2>AI-Powered Diagnosis</h2>
          <p>Our advanced AI technology detects various eye problems with accuracy.</p>
        </div>
      </section>

      <section className={styles['call-to-action']}>
        <h2>Ready to Improve Your Eye Health?</h2>
        <Link to="/login">
          <button className={styles['cta-button']}>Start Checkup</button>
        </Link>
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2023 Smart Eye Checkup</p>
      </footer>
    </div>
  );
};

export default LandingPage;
