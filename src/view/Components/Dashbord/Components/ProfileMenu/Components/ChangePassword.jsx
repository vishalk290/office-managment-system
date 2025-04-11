import {useState} from 'react'
import React from "react";
import profile from "../../images/profile.jpg"; 

const ChangePassword = () => {

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');



  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match');
      return;
    }

    
    setSuccess('Password changed successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };



  return (
    <div className="auth-container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="profile-section">
            <img src={profile} alt="admin-profile" className="profile-img"/>
            <h2 className="admin-name">admin name</h2>
          </div>
          <label> name: </label>
        <input
          type="text"
          value=""
          readOnly
        />
        <label> email: </label>
        <input
          type="text"
          value=""
          readOnly
        />
        
          
        <label>old Password:</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
        <label>Current Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <label>New Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <button type="submit">Update Password</button>
      </form>
    </div>
  </div>
  );
};

export default ChangePassword;