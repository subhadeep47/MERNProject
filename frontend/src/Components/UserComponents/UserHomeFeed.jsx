import axios from "axios";
import React, { useEffect, useState } from "react";
import Popup from "./Popup";

const UserHomeFeed = ({data})=>{
    const [postData,setPostData] = useState({_id:'', post:''});
    const [userData,setUserData] = useState();
    const [feedData, setFeedData] = useState();
    const [popupData, setPopupData] = useState({status:false, data:{}});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        async function fetchFeedData(){
            try{
                setIsLoading(true);
                const res = await axios.get('/getFeedData');
                setFeedData(res.data);
                setIsLoading(false);
            }catch(err){
                console.log(err);
            }
        }
        fetchFeedData();
    }, []);

    useEffect(()=>{
        setUserData(data);
        setPostData({_id:data._id});
    },[data]);

    const handleInput = (e)=>{
        setPostData({...postData,post:e.target.value});
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        axios.post('/addPost', postData).then((res)=>{
            window.alert('Successfully added the post');
            setPostData({...postData,post:""});
            setUserData(res.data);
        }).catch((err)=>{
            window.alert('There is some error occurred during adding your post!!');
        })
    }

    const handleLike = (e)=>{
        if(!userData.likedMessages.includes(e.target.dataset.msgid)){
            axios.post('/like',{msg_id:e.target.dataset.msgid,user_id:e.target.dataset.userid,my_id:userData._id}).then((res)=>{
                setFeedData(res.data.feed);
                setUserData(res.data.user);
            }).catch((err)=>{
                console.log(err);
            })
        }
        else{
            axios.post('/unlike',{msg_id:e.target.dataset.msgid,user_id:e.target.dataset.userid,my_id:userData._id}).then((res)=>{
                setFeedData(res.data.feed);
                setUserData(res.data.user);
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
                <textarea id='postBox' className='postBox' form="postForm" rows='7' cols='50' placeholder="Enter your post" required onChange={handleInput} value={postData.post}/><br/>
                <button className="addButton" type="submit">Post</button>
            </form>
        </div>
        <div className="messageContainer">
            {isLoading && <div className="loading">It's loading</div>}
            {feedData && !isLoading && feedData.map((item1,ind1)=>{
                if(item1._id!==userData._id){
                    return(
                        <>
                            {item1.messages.map((item2,ind2)=>{
                                let style;
                                if(userData.likedMessages && userData.likedMessages.includes(item2._id)){
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
                                        <div className="feedPost">
                                            <div className="userName" onClick={handlePopup} data-username={item1.name}
                                            data-useremail={item1.email} data-usernumber={item1.number}>
                                                {item1.name}
                                            </div>
                                            <div className="feedPostContent">
                                                {item2.message}<br /><br />Added, {item2.date}
                                            </div>
                                            <div>
                                                <button style={style} className="likeButton" data-userid={item1._id} data-msgid={item2._id} onClick={handleLike}>{item2.like} Like</button>
                                            </div>
                                        </div>
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