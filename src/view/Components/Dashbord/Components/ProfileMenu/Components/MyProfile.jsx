import React, { useState } from "react";

const MyProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [role,setRole] = useState("");
  return (
    <div className="auth-container">
      <div className="form-container">
        <div className="form-toggle">
          <>
            <h2>Login Form</h2>
            <label>profile:</label>
            <img src="" alt="admin profile" />
            <br/>
            <br/>
            <label>Name:</label>
            <input
              type="text"
              placeholder="enter name"
              onChange={(e) => setName(e.target.value)}
            />
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>addrerss:</label>
            <input
              type="text"
              placeholder="enter address"
              onChange={(e) => setAddress(e.target.value)}
            />
            <label>Role:</label>
            <input
              type="text"
              placeholder="Enter Role"
              onChange={(e) => setRole(e.target.value)}
            />
          </>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
