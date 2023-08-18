import React from "react";

const Profile = ({data}) =>{
    return(
        <>
            <h1 className="text-center">This is {data.name}'s profile page</h1>
        </>
    )
}

export default Profile;