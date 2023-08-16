import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import API_BASE_URL from '../APIContext'
import styles from './Login.module.css';
import log from '../../assets/images/eye1.png'
import { Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useCookies(['myToken'])
    const [group, setGroup] = useCookies(['myGroup'])
    let navigate = useNavigate();


    const handleLogin = async (e) => {

        e.preventDefault();

        // Validate email
        if (!email) {
          console.error('Email is required');
          return;
        }
      
        // Validate password
        if (!password) {
          console.error('Password is required');
          return;
        }
      
        if (password.length < 8) {
          console.error('Password must be at least 8 characters long');
          return;
        }

        let formData = new FormData();

        formData.append("email", email);
        formData.append("password", password);

        let requestOption = {
          method: "POST",
          body: formData,
          redirect: "follow"
        };

        try {
          const response = await fetch(
            `${API_BASE_URL}/auth/login/`,
            requestOption
          );
          const responseData = await response.text();
          const jsonResponse = JSON.parse(responseData);
    
          console.log('success', jsonResponse);
          setToken("access_token", jsonResponse.accessToken)
          setGroup("group", jsonResponse.group)
          navigate('/home')
          
          
        } catch (error) {
          console.log('Error:', error);
          navigate('/login')

        }
      };


    return (
        <div className={styles.container}>
            <div className={styles.loginContainer}>
                <div className={styles.formColumn}>
                    <div className={styles.loginCard}>
                        <h2>Login</h2>
                        <form className={styles.loginForm} onSubmit={handleLogin}>
                            <input type="email" name="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} />
                            <input type="password" name="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} />
                            <button type="submit">Login</button>
                            <p>Don't have an account? <Link to='/signup' style={{ textDecoration: 'none', color: "#011e3d", fontWeight: 'bold' }}>Sign up Now!!!</Link></p>
                        </form>
                    </div>
                </div>
                <div className={styles.imageColumn}>
                    <img src={log} alt="Login" height="100%" width="100%" />
                </div>
            </div>
        </div>
    );
};


export default Login
