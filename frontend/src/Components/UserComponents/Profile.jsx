import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = ({data}) =>{
    const [userData,setUserData] = useState({});

    useEffect(()=>{
        setUserData(data);
    },[data]);

    const handleDelete = (e)=>{
        if(window.confirm("Are you sure?")){
            const deleteData = {msg_id:e.target.value,_id:userData._id};
            axios.post('/deletePost', deleteData).then((res)=>{
                window.alert('Successfully deleted the post');
                setUserData(res.data);
            }).catch((err)=>{
                window.alert(err.response.data.err);
            })
        }
    }

    return(
        <>
            <h1 className="text-center">This is {userData.name}'s profile page</h1>
            <div className="myPosts">
                {userData.messages && userData.messages.map((post,ind)=>{
                    return(
                        <>
                            <div className="myPost">
                                <div className="myName">You</div>
                                <div className="post">
                                    {post.message} <br/>
                                    Date added, {post.date}
                                </div>
                                <div className="totalLike">
                                    Total like, {post.like}
                                </div>
                                <div className="postDelete">
                                    <button className="dltbtn" value={post._id} onClick={handleDelete}>Delete</button>
                                </div>
                            </div>
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default Profile;