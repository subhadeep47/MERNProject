import React, { useEffect, useState } from "react";
import Popup from "./Popup";
import api from "../../api";
import { hideLoader, showLoader } from "../../Actions/generalActions";
import FeedPost from "./FeedPost";

const UserHomeFeed = ({data})=>{
    const [postData,setPostData] = useState({_id:'', post:'', isAnonymous:false});
    const [userData,setUserData] = useState();
    const [likedMessages, setLikedMessages] = useState();
    const [feedData, setFeedData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [popupData, setPopupData] = useState({status:false, data:{}});

    useEffect(()=>{
        async function fetchFeedData(){
            try{
                showLoader();
                setIsLoading(true);
                const res = await api.get(`/getFeedData`);
                setFeedData(res.data);
                hideLoader();
                setIsLoading(false);
            }catch(err){
                console.log(err);
            }
        }
        fetchFeedData();
    }, []);

    useEffect(()=>{
        setUserData(data);
        setLikedMessages(new Set(data.likedMessages));
        setPostData({_id:data._id});
    },[data]);

    const handleInput = (e)=>{
        const { name, value, type, checked } = e.target;
        setPostData((prevData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
        }));
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        showLoader();
        api.post(`/addPost`, postData).then((res)=>{
            window.alert('Successfully added the post');
            setPostData({...postData,post:""});
            setUserData(res.data);
            hideLoader();
        }).catch((err)=>{
            hideLoader();
            window.alert('There is some error occurred during adding your post!!');
        })
    }

    const handleLike = (e)=>{
        if(!likedMessages.has(e.target.dataset.msgid)){
            api.post(`/like`,{msg_id:e.target.dataset.msgid,user_id:e.target.dataset.userid,my_id:userData._id}).then((res)=>{
                setFeedData(res.data.feed);
                setUserData(res.data.user);
                likedMessages.add(e.target.dataset.msgid);
            }).catch((err)=>{
                console.log(err);
            })
        }
        else{
            api.post(`/unlike`,{msg_id:e.target.dataset.msgid,user_id:e.target.dataset.userid,my_id:userData._id}).then((res)=>{
                setFeedData(res.data.feed);
                setUserData(res.data.user);
                likedMessages.delete(e.target.dataset.msgid);
            }).catch((err)=>{
                console.log(err);
            })
        }
    }

    const handlePopup = (e)=>{
        if(popupData.status){
            setPopupData({status:false,data:{}});
        }
        else{
            setPopupData({status:true,data:{
                name:e.target.dataset.username,
                email:e.target.dataset.useremail,
                number:e.target.dataset.usernumber
            }});
        }
    }

    return(
        <>
        <div className="addPostContainer">
            <form id="postForm" onSubmit={handleSubmit} method="post">
                <textarea id='postBox' className='postBox' form="postForm" rows='7' cols='50' name="post" placeholder="Enter your post" required onChange={handleInput} value={postData.post}/><br/>
                <div className="buttonBox">
                    <input type="checkBox" className="anonymousInput" id="anonymous" name="isAnonymous" onChange={handleInput} checked={postData.isAnonymous}/>
                    <label htmlFor="anonymous" className="anonymousLabel">Stay Anonymous?</label>
                    <button className="addButton" type="submit">Post</button>
                </div>
            </form>
        </div>
        <div className="messageContainer">
            {feedData && !isLoading && feedData.map((item1,ind1)=>{
                if(item1._id!==userData._id){
                    return(
                        <>
                            {item1.messages.map((item2,ind2)=>{
                                let style;
                                if(likedMessages && likedMessages.has(item2._id)){
                                    style = {
                                        color:'blue'
                                    };
                                }
                                else{
                                    style = {
                                        
                                    };
                                }
                                return(
                                    <>
                                        <FeedPost
                                            username={item1.name}
                                            useremail={item1.email}
                                            usernumber={item1.number}
                                            userid={item1._id}
                                            message={item2}
                                            style={style}
                                            handleLike={handleLike}
                                            handlePopup={handlePopup}
                                        />
                                    </>
                                )
                            })}
                        </> 
                    )
                }
                else{
                    return(null);
                }
            })}
            {popupData.status && (<Popup udata = {popupData.data} handlePopup={handlePopup} />)}
        </div> 
        </>
    )
}

export default UserHomeFeed;