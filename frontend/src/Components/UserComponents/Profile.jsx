import React, { useEffect, useState } from "react";
import EditUserPopup from "./EditUserPopup";
import api from "../../api";
import { hideLoader, showLoader } from "../../Actions/generalActions";

const Profile = ({data}) =>{
    const [userData,setUserData] = useState({});
    const [editMessage, setEditMessage] = useState({msg:''});
    const [popupData, setPopupData] = useState({status:false, data:{}})

    useEffect(()=>{
        setUserData(data);
    },[data]);

    const handleDelete = (e)=>{
        if(window.confirm("Are you sure?")){
            const deleteData = {msg_id:e.target.value,_id:userData._id};
            showLoader();
            api.post(`/deletePost`, deleteData).then((res)=>{
                hideLoader();
                window.alert('Successfully deleted the post');
                setUserData(res.data);
            }).catch((err)=>{
                hideLoader();
                window.alert(err.response.data.err);
            })
        }
    }

    const handleEdit = (e)=>{
        setEditMessage({msg:e.target.dataset.msg})
        document.getElementById('post'+e.target.value).style.display = 'none';
        document.getElementById('editForm'+e.target.value).style.display = 'block';
    }

    const handleCancelEdit = (e)=>{
        e.preventDefault();
        document.getElementById('post'+e.target.value).style.display = 'block';
        document.getElementById('editForm'+e.target.value).style.display = 'none';
    }

    const handleEditMessageInput = (e)=>{
        setEditMessage({msg:e.target.value});
    }

    const handleEditMessageSubmit = (e)=>{
        e.preventDefault();
        const data = {msg_id:e.target.dataset.value, msg:editMessage.msg, my_id:userData._id};
        showLoader();
        api.post(`/editmsg`, data).then((res)=>{
            setUserData(res.data);
            document.getElementById('post'+e.target.dataset.value).style.display = 'block';
            document.getElementById('editForm'+e.target.dataset.value).style.display = 'none';
            hideLoader();
        }).catch((err)=>{
            console.log(err);
            hideLoader();
        })
    }

    const handleEditUserPopup = (e)=>{
        if(popupData.status){
            setPopupData({...popupData, status:false});
        }
        else{
            setPopupData({status:true, data:userData});
        }
    }

    return(
        <>
            <h1 className="text-center">This is {userData.name}'s profile page</h1>
            <div className="editProfile">
                <button className="editProfilebtn" onClick={handleEditUserPopup}>Edit Profile</button>
            </div>
            <div className="myPostContainer">
                {userData.messages && userData.messages.map((post,ind)=>{
                    const editPostId = "editForm"+post._id;
                    const postId = "post"+post._id;
                    return(
                        <>
                            <div className="myPost">
                                <div className="myName">You</div>
                                <div id={postId} className="postContent">
                                    <div className="postMsg">
                                        {post.message} <br /><br />
                                        Date added, {post.date}
                                    </div><br/>
                                    <div className="totalLike">
                                    Total like, {post.like}
                                    </div><br/>
                                    <div className="postDeleteBtn">
                                        <button className="dltbtn" value={post._id} onClick={handleDelete}>Delete</button>
                                    </div>
                                    <div className="postEditBtn">
                                        <button className="editbtn" data-msg={post.message} value={post._id} onClick={handleEdit}>Edit</button>
                                    </div>
                                </div>
                                <div id={editPostId} className="editPost">
                                    <form id='editForm' method="post" data-value={post._id} onSubmit={handleEditMessageSubmit}>
                                        <textarea className='editText' form='editForm' value={editMessage.msg} onChange={handleEditMessageInput}/><br/>
                                        <button className="cancelEditBtn" value={post._id} onClick={handleCancelEdit}>Cancel</button>
                                        <button className="saveEditBtn" type="submit">Save</button>
                                    </form>
                                </div>
                            </div>
                        </>
                    )
                })}
            </div>
            {popupData.status && <EditUserPopup data={popupData.data} handleEditUserPopup={handleEditUserPopup} setUserData={setUserData}></EditUserPopup>}
        </>
    )
}

export default Profile;