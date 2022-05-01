import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../Assets/Image/logo.png";
import auth from "../Firebase/Firebase.init";
import "./Navbar.css";

const Navbar = () => {
  const { pathname } = useLocation();
  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
    });
  },[])

  const handleLogout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <nav
      style={
        pathname.includes("blog") ? { display: "none" } : { display: "flex" }
      }
    >
      <div className='logo-container'>
        <img src={Logo} alt='' />
      </div>
      <div className='link-container'>
        <NavLink
          className={({ isActive }) => (isActive ? "active-link" : "link")}
          to='/'
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active-link" : "link")}
          to='/videos'
        >
          Videos
        </NavLink>
        {user?.uid 
        ? 
        (<button onClick={handleLogout} className='logout-button'>Logout</button>) 
        : 
        (<NavLink className={({ isActive }) => (isActive ? "active-link" : "link")}
          to='/login'>
          Login
        </NavLink>)}
      </div>
    </nav>
  );
};

export default Navbar;