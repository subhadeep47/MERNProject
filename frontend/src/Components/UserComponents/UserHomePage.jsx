import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import UserHomeFeed from "./UserHomeFeed";
import Profile from "./Profile";
import { UserContext } from "../../App";
import api from "../../api";
import { hideLoader, showLoader } from "../../Actions/generalActions";

const UserHomePage = () => {
  const navigate = useNavigate();
  const { state } = useContext(UserContext);
  const [udata, setUdata] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        showLoader();
        const res = await api.get(`/getdata`, { withCredentials: true });
        if (res.data.message === "Not signed in") {
          window.alert("You are not signed in!!");
          navigate("/login");
          hideLoader();
        } else {
          setUdata(res.data);
          navigate(window.location.pathname);
          hideLoader();
        }
      } catch (err) {
        console.log("not signed in");
        hideLoader();
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Routes>
        <Route exact path="/" element={<UserHomeFeed data={udata} />} />
        <Route exact path="/profile" element={<Profile data={udata} />} />
      </Routes>
    </>
  );
};

export default UserHomePage;
