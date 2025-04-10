import React from "react";
import {useNavigate } from "react-router-dom";
// import MyProfile from './view/Components/Dashbord/Components/MyProfile/MyProfile.jsx';

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
                    <li onClick={()=>navigate("/client")}>client</li>
                    <li onClick={()=>navigate("/project")}>projects</li>
                </ul> 
                    <MyProfile/>
               </div>     
            </div>
        </div>
    );
}

export default Header