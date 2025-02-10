import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './forgotPassword.css'; // Use the same CSS file for styling

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://techlearnapi-caa5ekgrfzffd2ed.canadacentral-01.azurewebsites.net/api/accounts/forgot-password', { email }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error: ' + (error.response?.data?.errors?.email?.[0] || 'An error occurred'));
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Submit</button>
                    {message && <p style={{ color: 'red' }}>{message}</p>}
                </form>
                <p className="signup-link"><Link to="/">Back to Login</Link></p>
            </div>
        </div>
    );
};

export default ForgotPassword;
