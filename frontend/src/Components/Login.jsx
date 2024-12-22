import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import api from "../api";

const Login = (props)=> {
  const navigate = useNavigate();
  const [udata, setUdata] = useState({email:'', pass:''});
  const {dispatch} = useContext(UserContext);

  useEffect(()=>{
      async function fetchData(){
        try{
          const res = await api.get(`/getdata`, {withCredentials:true});
          if(res.data.message==='Not signed in'){
            console.log("fetchdata");
            console.log(res.data.message);
          }
          else{
            navigate(`/userhomepage/${res.data.name}`);
          }
        }catch(err){
          console.log(err);
        }
      }
      fetchData();
    }, []);

    const handleInput = (e)=>{
      let key = e.target.name;
      let value = e.target.value;
      setUdata({...udata,[key]:value});
    }

  const handleSubmit = (e)=>{
    e.preventDefault();
    api.post(`/login`, udata, {
        withCredentials: true,
        }).then((res)=>{
      console.log(res);
      window.localStorage.setItem('isLoggedIn', true);
      dispatch({type:'user', value:{isLoggedIn:true}});
      navigate(`/userhomepage/${res.data.name}`);
    }).catch(err=>{
        console.log(err);s
        window.alert(err.response.data.error);
        navigate('/login');
      })
    
  }

  return (
    <>
      <div className="logincontainer">
        <div className="form-box">
          <h5 className="login-title text-center">Enter your login credential</h5>
          <form onSubmit={handleSubmit} className="form" method="post">
              <div className="mb-3 row">
                <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                <div className="col-sm-8">
                  <input type="email" className="form-control" id="email" placeholder="email@example.com" name="email" value={udata.name} onChange={handleInput}/>
                </div>
              </div>
              <div className="mb-3 row">
                <label htmlFor="pass" className="col-sm-3 col-form-label">Password</label>
                <div className="col-sm-8">
                  <input type="password" className="form-control" id="pass" placeholder="Password" name="pass" value={udata.pass} onChange={handleInput}/>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <button className="btn btn-secondary " type="submit">Submit</button>
              </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
