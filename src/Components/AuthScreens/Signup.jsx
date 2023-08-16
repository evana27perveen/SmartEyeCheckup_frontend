import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../APIContext'
import styles from './Login.module.css';
import log from '../../assets/images/eye1.png'
import { Link } from 'react-router-dom';

function Signup() {
    

    const [group, setGroup] = useState('')

    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    let navigate = useNavigate();


    const handleSignUp = async (e) => {

        e.preventDefault();

        // Validate email
        if (!email) {
        console.error('Email is required');
        return;
        }
    
        if (!/\S+@\S+\.\S+/.test(email)) {
        console.error('Invalid email');
        return;
        }
    
        // Validate password
        if (!password1) {
        console.error('Password is required');
        return;
        }
    
        if (password1.length < 8) {
        console.error('Password must be at least 8 characters long');
        return;
        }
    
        // Validate confirm password
        if (password2 !== password1) {
        console.error('Passwords do not match');
        return;
        }

    let formData = new FormData();

    formData.append("email", email);
    formData.append("password", password1);
    formData.append("group", group);

    let requestOption = {
        method: "POST",
        body: formData,
        redirect: "follow"
    };

    try {
        const response = await fetch(`${API_BASE_URL}/auth/register/`, requestOption);
        const responseData = await response.text();
        const jsonResponse = JSON.parse(responseData);

        console.log('success', jsonResponse);
        navigate('/login')
    } catch (error) {
        console.log('Error:', error);
    }
    };

    const handleGroupChange = (e) => {
        setGroup(e.target.value);
      };

    return (
        <div className={styles.container}>
            <div className={styles.loginContainer}>
                <div className={styles.formColumn}>
                    <div className={styles.loginCard}>
                        <h2>Sign Up</h2>
                        <form className={styles.loginForm} onSubmit={handleSignUp}>
                            <input type="email" name="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} />

                            <input type="password" name="password" placeholder="Password" required value={password1} onChange={e => setPassword1(e.target.value)} />

                            <input type="password" name="password2" placeholder="Confirm Password" required value={password2} onChange={e => setPassword2(e.target.value)} />

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flex: 1, }}>
                                <label style={{ justifyContent: 'right' }}>
                                    <input
                                        type="radio"
                                        name="group"
                                        value="DOCTOR"
                                        checked={group === 'DOCTOR'}
                                        onChange={handleGroupChange}
                                        required
                                    />
                                    Doctor
                                </label>
                                <label style={{ marginLeft: '10px' }}>
                                    <input
                                        type="radio"
                                        name="group"
                                        value="PATIENT"
                                        checked={group === 'PATIENT'}
                                        onChange={handleGroupChange}
                                        required
                                    />
                                    Patient
                                </label>
                            </div>

                            <button type="submit">Sign Up</button>
                            <p>Already have an account? <Link to='/login' style={{ textDecoration: 'none', color: "#011e3d", fontWeight: 'bold' }}>Login Here!!!</Link></p>
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

export default Signup
