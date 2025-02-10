import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import './forgotPassword.css'; // Use the same CSS file for styling

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const email = queryParams.get('email');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post('https://techlearnapi-caa5ekgrfzffd2ed.canadacentral-01.azurewebsites.net/api/accounts/reset-password', 
            { email, token, password, confirmPassword }, 
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error: ' + (error.response?.data?.errors || 'An error occurred'));
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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

export default ResetPassword;
