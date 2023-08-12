import React, { useContext, useEffect } from "react";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";
import UserNavbar from "./UserNavbar"
import Profile from "./Profile";

const UserHomePage = () =>{
    const navigate = useNavigate();

    useEffect(()=>{
        async function fetchData(){
            try{
              const res = await axios.get('/getdata', {withCredentials:true});
              if(res.data.message!=='Not signed in'){
                navigate(`/userhomepage/${res.data.name}`);
              }
              else{
                console.log("fetchdata");
                console.log(res.data.message);
              }  
            }catch(err){
              console.log('not signed in');;
            }
          }
        fetchData();
    }, []);

    return(
        <>
            <UserNavbar/>
            <Routes>
                <Route path={'/profile'} element={<Profile/>}/>
            </Routes>
        </>
    )
}

export default UserHomePage;