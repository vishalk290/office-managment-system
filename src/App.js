// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Header from "./view/Layout/Header/Header.jsx";
import Footer from "./view/Layout/Footer/Footer.jsx";
import Dashbord from "./view/Components/Dashbord/Dashbord.jsx";
import User from "./view/Components/Dashbord/Components/User/User.jsx";
import Project from "./view/Components/Dashbord/Components/Project/Project.jsx";
import Client from "./view/Components/Dashbord/Components/Client/Client.jsx";
import ProfileMenu from "./view/Components/Dashbord/Components/ProfileMenu/ProfileMenu.jsx";


function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Dashbord/>}/>
        <Route path="/user" element={<User />} />

        <Route path="/client" element={<Client />} />
        <Route path="/project" element={<Project />} />
        <Route path="/profilemenu" element={<ProfileMenu />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

