import React from "react";
import { useLocation } from "react-router-dom";

const UserHomePage = () =>{
    const location = useLocation();
    
    return(
        <>
            <h1>{location.state.pass}</h1>
            <h3>vbwwilrebi</h3>
        </>
    )
}

export default UserHomePage;