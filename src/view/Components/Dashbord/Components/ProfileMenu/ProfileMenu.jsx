import React, { useState } from 'react';
import { UserCircle } from 'lucide-react'; 
import LogoutIcon from '@mui/icons-material/Logout';



const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropDown = (event) => {
    setIsOpen(!isOpen);
    event.preventDefault();
  };

  return (
    <div className="profile-dropdown" >
      <UserCircle className="admin-icon" size={29} onClick={toggleDropDown} />
      {isOpen && (
        <ul className="dropdown-menu" style={{ Color: "blue"}}>
          <li><a href="/MyProfile" >MyProfile</a></li>
          
          <li><a href="/changepassword">ChangePassword</a></li>
          <li><a href="/Setting">setting</a></li>
          <li>
            
          <LogoutIcon style={{ marginRight: '78px' }} />

          </li>
        </ul>
      )}
    </div>
  );
};

export default ProfileMenu;
