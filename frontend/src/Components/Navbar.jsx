import React from "react";
import { NavLink } from 'react-router-dom'

function Navbar(props) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">Share Story</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/" style={({ isActive }) => ({ 
                            color: isActive ? 'blue' : 'white', fontWeight: isActive ? 'bold' : 'normal' })}>Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about" style={({ isActive }) => ({ 
                            color: isActive ? 'blue' : 'white', fontWeight: isActive ? 'bold' : 'normal' })}>About</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact" style={({ isActive }) => ({ 
                            color: isActive ? 'blue' : 'white', fontWeight: isActive ? 'bold' : 'normal' })}>Contact</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login" style={({ isActive }) => ({ 
                            color: isActive ? 'blue' : 'white', fontWeight: isActive ? 'bold' : 'normal' })}>Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/signup" style={({ isActive }) => ({ 
                            color: isActive ? 'blue' : 'white', fontWeight: isActive ? 'bold' : 'normal' })}>Sign Up</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
