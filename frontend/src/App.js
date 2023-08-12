import React, { createContext, useReducer } from "react";
import { Route, Routes } from "react-router";
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Home from "./Components/Home";
import Signup from './Components/Signup';
import UserHomePage from "./Components/UserComponents/UserHomePage";
import ErrorPage from "./Components/ErrorPage";
import Logout from "./Components/Logout";
import { reducer, initialvalue } from "./Reducer/reducer";


export const UserContext = createContext();
const App = ()=> {

  const [state, dispatch] = useReducer(reducer, initialvalue);

  return (
    <>
      <UserContext.Provider value={{state,dispatch}}>
        {!state.isLoggedIn ? <Navbar/> : ''}
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/signup" element={<Signup/>}/>
          <Route exact path="/userhomepage/:id/*" element={<UserHomePage/>}/>
          <Route exact path="/logout" element={<Logout/>}/>
          <Route path='*' element={<ErrorPage/>}/>
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
