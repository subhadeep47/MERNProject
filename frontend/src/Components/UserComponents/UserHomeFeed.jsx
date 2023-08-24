import axios from "axios";
import React, { useEffect, useState } from "react";

const UserHomeFeed = ({data})=>{
    const [postData,setPostData] = useState({_id:'', post:''});
    const [userData,setUserData] = useState({});
    const [feedData, setFeedData] = useState();

    useEffect(()=>{
        async function fetchFeedData(){
            try{
                const res = await axios.get('/getFeedData');
                setFeedData(res.data);
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
        if(!userData.likedMessages.some(msg=>msg.msgid===e.target.dataset.msgid)){
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

    return(
        <>
        <div className="addPostContainer">
            <form id="postForm" onSubmit={handleSubmit} method="post">
                <textarea id='postBox' className='postBox' form="postForm" rows='7' cols='50' placeholder="Enter your post" required onChange={handleInput} value={postData.post}/><br/>
                <button className="addButton" type="submit">Post</button>
            </form>
        </div>
        <div className="messageContainer">
            {feedData && feedData.map((item1,ind1)=>{
                if(item1._id!==userData._id){
                    return(
                        <>
                            {item1.messages.map((item2,ind2)=>{
                                return(
                                    <>
                                        <div className="feedPosts">
                                            <div className="userName">{item1.name}</div>
                                            <div className="post">
                                                {item2.message}<br/>Added, {item2.date}
                                            </div>
                                            <div>
                                                <button className="likeButton" data-userid={item1._id} data-msgid={item2._id} onClick={handleLike}>{item2.like} Like</button>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        </> 
                    )
                }
                else{
                    return(<></>);
                }
            })}
        </div> 
        </>
    )
}

export default UserHomeFeed;