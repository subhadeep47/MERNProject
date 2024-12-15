import React, { useState } from "react";
import register from '../Image/register.jpg'
import { useNavigate , NavLink } from "react-router-dom";
import axios from 'axios';

const Signup = ()=>{
    const base_uri = process.env.BASE_URI;
    const [user, setUser] = useState({
        name:'',
        email: '',
        number: '',
        pass: '',
        cpass: '',
    });
    const navigate = useNavigate();

    const handleInput = (e) =>{
        let field = e.target.name;
        let value = e.target.value;
        setUser({...user,[field]:value});
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        const {name, email, number, pass, cpass} = user;
        axios.post(`${base_uri}/register`,{name, email, number, pass, cpass}).then(
            (res)=>{
                    window.alert('Successfully Registered!!');
                    navigate('/login');
            }
        ).catch((err)=>{
            window.alert('There is some problem to register the user');
            console.log('Problem with '+ err)
            navigate('/login');
        }
        );
    };

    return(
        <>
            <div className="container signupcontainer">
                <div className='row signup-title'>
                    <div className="col d-flex justify-content-center">
                        <h3>Fill the registration form</h3>
                    </div>
                </div>
                <div className="row d-flex align-items-center">
                    <div className="col-6 d-flex justify-content-center">
                        <form onSubmit={handleSubmit} className="form" method="post">
                            <div className="mb-3 row uname">
                                <label className="form-label col" htmlFor="name">Name</label>
                                <input type="text" name='name' id="name" className="form-control col" value={user.name} onChange={handleInput}/>
                            </div>
                            <div className="mb-3 row umail ">
                                <label className="form-label col" htmlFor="mail">E-mail</label>
                                <input type="email" name='email' id="email" className="form-control col" value={user.email} onChange={handleInput}/>
                            </div>
                            <div className="mb-3 row unumber ">
                                <label className="form-label col" htmlFor="number">Phone Number</label>
                                <input type="tel" name='number' id="number" className="form-control col" value={user.phone} onChange={handleInput}/>
                            </div>
                            <div className="mb-3 row upass ">
                                <label className="form-label col" htmlFor="pass">Password</label>
                                <input type="password" name='pass' id="pass" className="form-control col" value={user.pass} onChange={handleInput}/>
                            </div>
                            <div className="mb-3 row ucpass ">
                                <label className="form-label col" htmlFor="cpass">Confirm Password</label>
                                <input type="password" name='cpass' id="cpass" className="form-control col" value={user.cpass} onChange={handleInput}/>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button id='signbtn' className="btn btn-secondary " type="submit">Register</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-6 d-flex justify-content-center">
                        <figure>
                            <img id='regiimg' className="img-responsive" src={register} alt="" />
                            <figcaption className="text-center"><NavLink to='/login'>Already register? Click here!</NavLink></figcaption>
                        </figure>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;