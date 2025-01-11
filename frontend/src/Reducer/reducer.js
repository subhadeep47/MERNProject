import { hideLoader, showLoader } from "../Actions/generalActions";
import api from "../api";


async function isUserLoggedIn() {
    try {
        showLoader();
        const response = await api.get('/check-login',{withCredentials:true});
        const data = await response.json();
        hideLoader();
        return data.loggedIn;
    } catch (error) {
        console.error('Error checking login status:', error);
        hideLoader();
        return false;
    }
  }


export const initialvalue = {
    isLoggedIn:isUserLoggedIn(),
};


export const reducer = (state, action)=>{
    console.log('from reducer')
    if(action.type==='user')
        return action.value;
    return state;
}