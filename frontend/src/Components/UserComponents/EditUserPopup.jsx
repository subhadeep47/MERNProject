import axios from "axios";
import React, { useState } from "react";

const EditUserPopup = ({data, handleEditUserPopup, setUserData})=>{
    const base_uri = process.env.REACT_APP_BASE_URI;
    const [editUserData, setEditUserData] = useState({
        name:data.name,
        email:data.email,
        number:data.number
    });

    const handleEditUserData = (e)=>{
        setEditUserData({...editUserData, [e.target.name]:e.target.value})
    }

    const handleEditUser = (e)=>{
        e.preventDefault();
        const udata = {_id:data._id,name:editUserData.name,email:editUserData.email,number:editUserData.number};
        axios.post(`${base_uri}/edituser`, udata).then((res)=>{
            setUserData(res.data);
            alert('Sucessfully saved your details!!');
        }).catch((err)=>{
            console.log(err);
        })
    }

    return(
        <>
            <div className="popupContainer">
                <div className="popup">
                    <div className='close'>
                        <button className="closeBtn" onClick={handleEditUserPopup}>X</button>
                    </div>
                    <div className="editUserFormContainer">
                        <form className='editUserForm' onSubmit={handleEditUser} method="post">
                            <h1>Edit your details</h1>
                            <div className="formInput">
                                <label htmlFor="name">Name: </label>
                                <input style={{marginLeft:'64px'}} type="text" id="name" name="name" value={editUserData.name} onChange={handleEditUserData}/>
                            </div>
                            <div className="formInput">
                                <label htmlFor="email">E-mail: </label>
                                <input style={{marginLeft:'60px'}} type="text" id="email" name="email" value={editUserData.email} onChange={handleEditUserData}/>
                            </div>
                            <div className="formInput">
                                <label htmlFor="number">Phone Number: </label>
                                <input type="text" id="number" name="number" value={editUserData.number} onChange={handleEditUserData}/>
                            </div>
                            <div className="editSubmit">
                                <button>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditUserPopup;