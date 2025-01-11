import React, {useEffect, useContext} from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { hideLoader, showLoader } from "../Actions/generalActions";

const Logout = () =>{
    const navigate = useNavigate();
    const {dispatch} = useContext(UserContext);

    useEffect(()=>{
        dispatch({type:'user', value:{isLoggedIn:false}});
        async function deleteData(){
            showLoader();
            const res = await api.get(`/logout`,{withCredentials:true});
            console.log(res);
            navigate('/login');
            hideLoader();
        }
        deleteData();
    }, []);
        
    
    return(
        <>
            <h1>Logout processing!!!!</h1>
        </>
    )
}

export default Logout;