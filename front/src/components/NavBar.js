import React, { useState } from "react";
import "../styles/navbar/navbar.css";
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
const NavBar = () => {
  const navigate=useNavigate()
  const [active,setActive]=useState('nav-menu');
  const [toggleIcon,setToggleIcon]=useState('nav-toggler');
  const navToggle=()=>{
    active === 'nav-menu' ? setActive('nav-menu nav-active') : setActive('nav-menu');

    toggleIcon === 'nav-toggler' ? setToggleIcon('nav-toggler toggle') : setToggleIcon('nav-toggler')
  }
  return (
    <div className="navBar">
     <nav className="nav">
      <a href='#' className="nav-brand">✓미션체크</a>
      <ul className={active}>
        <li className="nav-item"><a onClick={()=>{
          navigate('/')
        }} className="nav-link">Home</a></li>
        <li className="nav-item"><a href="#" className="nav-link">MyPage</a></li>
        <li className="nav-item"><a href="#" className="nav-link">Challenges</a></li>
        <li className="nav-item"><a href="#" className="nav-link">Login/Join</a></li>
      </ul>
      <div onClick={navToggle} className={toggleIcon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
     </nav>
    </div>
  );
};

export default NavBar;
