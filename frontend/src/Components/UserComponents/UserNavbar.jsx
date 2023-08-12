import React from "react";
import { NavLink, useParams } from 'react-router-dom';

const UserNavbar = () =>{
    const param = useParams();
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to={'/userhomepage/'+param.id}>Share Story</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to={'/userhomepage/'+param.id+'/profile'} style={({ isActive }) => ({ 
                                        color: isActive ? 'blue' : 'black', fontWeight: isActive ? 'bold' : 'normal' })}>Profile</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="contact" style={({ isActive }) => ({ 
                                        color: isActive ? 'blue' : 'black', fontWeight: isActive ? 'bold' : 'normal' })}>Contact</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/logout" style={({ isActive }) => ({ 
                                        color: isActive ? 'blue' : 'black', fontWeight: isActive ? 'bold' : 'normal' })}>Logout</NavLink>
                        </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default UserNavbar;