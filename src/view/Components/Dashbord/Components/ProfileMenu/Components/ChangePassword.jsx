import { useState, useEffect } from "react";
import React from "react";
import profile from "../../images/profile.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // FIXED import

const ChangePassword = () => {
  const [uname, setUname] = useState(); //user info

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate(); // FIXED useNavigate

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")); //user info
    setUname(currentUser);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      const errMsg = "New password and confirm password do not match";
      setError(errMsg);
      toast.error(errMsg);
      return;
    }

    // to save password logic
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser || currentUser.password !== currentPassword) {
      toast.error("Current password is incorrect");
      return;
    }
    //update password...
    const updatedUser = {
      ...currentUser,
      password: newPassword,
    };

    // Update localStorage for both user and currentUser
    localStorage.setItem(currentUser.email, JSON.stringify(updatedUser));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    const successMsg = "Password changed successfully!";
    setSuccess(successMsg);
    toast.success(successMsg);

    // Clear  fields
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setTimeout(() => {
      // window.location.reload();
      const SuccessMsg = "please weit!";
      setSuccess(SuccessMsg);
      toast.success(SuccessMsg);

      // navigat e("*");
    }, 2000);
  };
  return (
    <div className="auth-container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="profile-section">
            <img src={profile} alt="admin-profile" className="profile-img" />
            <h2 className="admin-name">Hello {uname?.name || "admin"}</h2>
          </div>

          <div className="row row-two-columns">
            <div className="input-group">
              <label>name</label>
              <input
                type="text"
                placeholder=""
                value={uname?.name || "enter name"}
                readOnly
              />
            </div>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder=""
                value={uname?.email || "enter name"}
                readOnly
              />
            </div>
          </div>

          <div className="row">
            <label>Current Password:</label>
            <input
              type="password"
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

            <button type="submit" onClick={handleSubmit}>
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
