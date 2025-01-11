import React, { createContext, useEffect, useReducer } from "react";
import { Route, Routes } from "react-router";
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Home from "./Components/Home";
import Signup from './Components/Signup';
import UserHomePage from "./Components/UserComponents/UserHomePage";
import UserNavbar from "./Components/UserComponents/UserNavbar";
import ErrorPage from "./Components/ErrorPage";
import Logout from "./Components/Logout";
import { reducer, initialvalue } from "./Reducer/reducer";
import Loader from "./Components/Loader";
import api from "./api";


export const UserContext = createContext();
const App = ()=> {

  const [state, dispatch] = useReducer(reducer, initialvalue);

  useEffect(async ()=>{
    async function isUserLoggedIn() {
        try {
            const response = await api.get('/check-login',{withCredentials:true});
            const data = await response.json();
            return data.loggedIn;
        } catch (error) {
            console.error('Error checking login status:', error);
            return false;
        }
      }
      const value = await isUserLoggedIn();
      dispatch({type:'user', value:{isLoggedIn:value}});
  }, []);

  return (
    <>
      <UserContext.Provider value={{state,dispatch}}>
        {!state.isLoggedIn ? <Navbar/> : <UserNavbar />}
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/signup" element={<Signup/>}/>
          <Route exact path="/userhomepage/:id/*" element={<UserHomePage/>}/>
          <Route exact path="/logout" element={<Logout/>}/>
          <Route path='*' element={<ErrorPage/>}/>
        </Routes>
        <Loader />
      </UserContext.Provider>
    </>
  );
}

export default App;
