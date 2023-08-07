import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from './Component/Login';
import Navbar from './Component/Navbar';
import Home from "./Component/Home";
import Signup from './Component/Signup';
import UserHomePage from "./Component/UserHomePage";

const App = ()=> {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/signup" element={<Signup/>}/>
        <Route exact path="/userhomepage" element={<UserHomePage/>}/>
      </Routes>
    </>
  );
}

export default App;
