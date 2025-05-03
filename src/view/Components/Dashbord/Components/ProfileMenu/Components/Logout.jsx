import React from 'react'
import { useNavigate } from 'react-router-dom'; 

const Logout = () => {
    const navigate = useNavigate();

    const handlelgout = ()=>{
        localStorage.remove('userToken')
        localStorage.remove('userinfo');
        navigate("/Dashbord");
    }
  return (
    <div>
        <button onClick={handlelgout}> Logout</button>
      
    </div>
  )
}

export default Logout
