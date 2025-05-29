import React from "react";
import {useNavigate } from "react-router-dom";
// import MyProfile from './view/Components/Dashbord/Components/MyProfile/MyProfile.jsx';

// import ProfileMenu from "../../Components/Dashbord/Components/ProfileMenu/ProfileMenu.jsx";

 import MyProfile from '../../Components/Dashbord/Components/ProfileMenu/ProfileMenu.jsx';

const Header = ()=> {
    const navigate = useNavigate();

    return(

        <div className="main-header">
            <div className="header-content">
                <div className="website-logo" onClick={()=>navigate("/")}>Office-App</div>
                <div className="right">
                <ul className="nav-links">
                    <li onClick={()=>navigate("/")}>Dashbord</li>
                    <li onClick={()=>navigate("/User")}>user</li>
                    <li onClick={()=>navigate("/Clients")}>Clients</li>
                    <li onClick={()=>navigate("/project")}>projects</li>
                </ul> 
                
                  {/* <ProfileMenu />  */}
                     <MyProfile/> 
               </div>     
            </div>
        </div>
    );
}

export default Header