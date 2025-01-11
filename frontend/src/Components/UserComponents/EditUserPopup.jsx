import React, { useState } from "react";
import api from "../../api";
import { hideLoader, showLoader } from "../../Actions/generalActions";

const EditUserPopup = ({data, handleEditUserPopup, setUserData})=>{
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
        showLoader();
        const udata = {_id:data._id,name:editUserData.name,email:editUserData.email,number:editUserData.number};
        api.post(`/edituser`, udata).then((res)=>{
            setUserData(res.data);
            hideLoader();
            alert('Sucessfully saved your details!!');
        }).catch((err)=>{
            console.log(err);
            hideLoader();
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