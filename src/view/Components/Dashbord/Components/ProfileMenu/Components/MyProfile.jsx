import React from "react";
import profile from "../../images/profile.jpg";

const MyProfile = () => {
  return (
    <div className="auth-container">
      <div className="form-container">
        <form>
          <div className="profile-section">
            <img src={profile} alt="admin-profile" className="profile-img" />
            <h2 className="admin-name">[Admin Name]</h2>
          </div>

          <div className="row">
            <label>name:</label>
            <input type="text" placeholder="" readOnly />
            <label>Email:</label>
            <input type="email" placeholder="" readOnly />
          </div>

          <div className="row">
            <label>Address</label>
            <input type="text" placeholder="" readOnly />
            <label>Role</label>
            <input type="text" placeholder="" readOnly />
          </div>

          {/* <button type="button">Submit</button> */}
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
