import React, { useState, useEffect, useRef } from "react";
import { UserCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

   
const ProfileMenu = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);  
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

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userInfo");
    navigate("/"); //to navigate dashbord
    window.location.reload();
  };

  // Styles
  const styles = {
    profileDropdown: {
      position: "relative",
      display: "inline-block",
      cursor: "pointer"
    },
    adminIcon: {
      color: "#2563eb",
      cursor: "pointer"
    },
    dropdownMenu: {
      position: "absolute",
      right: 0,
      top: "40px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      width: "180px",
      zIndex: 1000,
      overflow: "hidden",
      border: "1px solid #e5e7eb"
    },
    menuItem: {
      padding: "0",
      margin: "0",
      listStyle: "none"
    },
    menuLink: {
      display: "block",
      padding: "12px 16px",
      textDecoration: "none",
      color: "#374151",
      fontSize: "14px",
      transition: "background-color 0.2s",
      fontWeight: 500
    },
    menuButton: {
      display: "block",
      width: "100%",
      textAlign: "left",
      padding: "12px 16px",
      cursor: "pointer",
      background: "none",
      border: "none",
      color: "#ef4444",
      fontSize: "14px",
      fontWeight: 500
    },
    hoverEffect: {
      backgroundColor: "#f3f4f6"
    }
  };

  // Hover state handlers
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <div style={styles.profileDropdown} ref={menuRef}>
      <UserCircle 
        style={styles.adminIcon} 
        size={29} 
        onClick={toggleDropDown} 
      />
      
      {isOpen && (
        <ul style={styles.dropdownMenu}>
          <li style={styles.menuItem}>
            <Link 
              to="/myprofile" 
              style={{
                ...styles.menuLink,
                ...(hoveredItem === 'profile' ? styles.hoverEffect : {})
              }}
              onMouseEnter={() => setHoveredItem('profile')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              My Profile
            </Link>
          </li>
          <li style={styles.menuItem}>
            <Link 
              to="/changepassword" 
              style={{
                ...styles.menuLink,
                ...(hoveredItem === 'password' ? styles.hoverEffect : {})
              }}
              onMouseEnter={() => setHoveredItem('password')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              Change Password
            </Link>
          </li>
          <li style={styles.menuItem}>
            <Link 
              to="/setting" 
              style={{
                ...styles.menuLink,
                ...(hoveredItem === 'setting' ? styles.hoverEffect : {})
              }}
              onMouseEnter={() => setHoveredItem('setting')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              Settings
            </Link>
          </li>
          <li style={styles.menuItem}>
            <button
              onClick={handleLogout}
              style={{
                ...styles.menuButton,
                ...(hoveredItem === 'logout' ? styles.hoverEffect : {})
              }}
              onMouseEnter={() => setHoveredItem('logout')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ProfileMenu;