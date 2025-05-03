import React from "react";
import profile from "../../images/profile.jpg";
import {useState, useEffect} from "react";

const MyProfile = () => {

  const [user,setUser] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    setUser(currentUser);
  }, []);

  return (
    <div className="auth-container">
      <div className="form-container">
        <form>
          <div className="profile-section">
            <img src={profile} alt="admin-profile" className="profile-img" />
            <h2 className="admin-name">welcome {user?.name || "admin"} </h2>
          </div>
        
          

          <div className="row">
            <label>name:</label>
            <input type="text" value={user?.name || "admin"} placeholder="" readOnly />
            <label>Email:</label>
            <input type="email" value={user?.email || "please provide email"} placeholder="" readOnly />
          </div>

          <div className="row">
            
            <label>Address</label>
            <input type="text"  value={user?.address || "peovide address"} placeholder="" readOnly />
            <label>Role</label>
            <input type="text" value={user?.role || "provide role"} placeholder="" readOnly />
          </div>

          {/* <button type="button">Submit</button> */}
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
