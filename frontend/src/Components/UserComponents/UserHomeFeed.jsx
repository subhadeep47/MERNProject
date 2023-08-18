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

    const handleDelete = (e)=>{
        const deleteData = {msg_id:e.target.value,_id:userData._id};
        axios.post('/deletePost', deleteData).then((res)=>{
            window.alert('Successfully deleted the post');
            setUserData(res.data);
        }).catch((err)=>{
            window.alert(err.response.data.err);
        })
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