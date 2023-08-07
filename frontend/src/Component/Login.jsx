import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props)=> {
  const navigate = useNavigate();
  const [udata, setUdata] = useState({email:'', pass:''});

  const handleInput = (e)=>{
    let key = e.target.name;
    let value = e.target.value;
    setUdata({...udata,[key]:value});
  }
  
  const handleSubmit = (e)=>{
    e.preventDefault();
    axios.post('/login', udata).then((res)=>{
      console.log(res);
      navigate('/userhomepage', {state:res.data});
    }).catch(err=>console.log(err))
    
  }

  return (
    <>
      <div className="container logincontainer">
        <div className="row d-flex align-items-center">
          <div className="col d-flex justify-content-center">
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
        </div>
      </div>
    </>
  );
}

export default Login;
