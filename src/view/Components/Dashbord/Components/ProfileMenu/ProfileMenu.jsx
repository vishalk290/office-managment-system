import React, { useState, useEffect, useRef } from 'react';
import { UserCircle } from 'lucide-react'; 
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null); // to hold the entire dropdown wrapper

  const toggleDropDown = (event) => {
    setIsOpen((prev) => !prev);
    event.preventDefault();
  };

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div className="profile-dropdown" ref={menuRef}>
      <UserCircle className="admin-icon" size={29} onClick={toggleDropDown} />
      {isOpen && (
        <ul className="dropdown-menu">
          <li><Link to="/myprofile">MyProfile</Link></li>
          <li><Link to="/changepassword">ChangePassword</Link></li>
          <li><Link to="/setting">Setting</Link></li>
          <li>
            <LogoutIcon style={{ marginRight: '78px', cursor: 'pointer' }} />
          </li>
        </ul>
      )}
    </div>
  );
};

export default ProfileMenu;
