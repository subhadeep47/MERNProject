import React, { useState } from "react";

const FeedPost = (props) => {
    const [showMore, setShowMore] = useState(false);

    const getDateFormat = date => {
        let formattedDate = date.getDate() + "/"
                + (date.getMonth()+1)  + "/" 
                + date.getFullYear() + " @ "  
                + date.getHours() + ":"  
                + date.getMinutes() + ":" 
                + date.getSeconds();
        return formattedDate;
    }

    return(
        <div className="feedPost">
            <button className="userName" onClick={props.handlePopup} data-username={props.username}
            data-useremail={props.useremail} data-usernumber={props.usernumber} data-isAnonymous={props.message.isAnonymous}>
                {props.message.isAnonymous ? 'Anonymous' : props.username}
            </button>
            <div className="feedPostContent">
                {showMore ? props.message.message+'   ' : props.message.message.substring(0,100)+'   '}
                {props.message.message.length>100 ? (<button className="showmorebtn" onClick={()=>setShowMore(!showMore)}>
                    {showMore ? "Read less" : "Read more..."}</button>): ''}
                <br /><br />Added, {getDateFormat(new Date(props.message.date))}
            </div>
            <div>
                <button style={props.style} className="likeButton" data-userid={props.userid} data-msgid={props.message._id} onClick={props.handleLike}>{props.message.like} Like</button>
            </div>
        </div>
    )
};

export default FeedPost;