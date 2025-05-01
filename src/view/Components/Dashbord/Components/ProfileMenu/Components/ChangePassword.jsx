import { useState } from 'react';
import React from 'react';
import profile from '../../images/profile.jpg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      //react tostify add...
      const errMsg = 'New password and confirm password do not match';
      setError(errMsg);
      toast.error(errMsg);
      return;
    }
        //react tostify add...
    const successMsg = 'Password changed successfully!';
    setSuccess(successMsg);
    toast.success(successMsg);
   
    //to store from our local system
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

 

  return (
    <div className="auth-container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="profile-section">
            <img src={profile} alt="admin-profile" className="profile-img" />
            <h2 className="admin-name">[Admin Name]</h2>
          </div>

          {/* Row for Name and Email */}
          <div className="row row-two-columns">
            <div className="input-group">
              <label>Name:</label>
              <input type="text" placeholder="Admin Name"  readOnly />
            </div>
            <div className="input-group">
              <label>Email:</label>
              <input type="email" placeholder="admin@example.com" readOnly />
            </div>
          </div>

          {/* Row for Password Fields */}
          <div className="row">
            <label>Current Password:</label>
            <input
              type="text"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />

            <label>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {/* {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
            {success && <p className="success" style={{ color: 'green' }}>{success}</p>} */}

            <button type="submit">Update Password</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;


       