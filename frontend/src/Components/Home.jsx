import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Home = ()=>{
    const navigate = useNavigate();
    const {state} = useContext(UserContext);

    useEffect(()=>{
        console.log();
    }, []);
    return(
        <>
            <h1>This is home page</h1>
        </>
    )
}

export default Home;