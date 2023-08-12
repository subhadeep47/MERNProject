import React, { useContext } from "react";
import { UserContext } from "../../App";

const Profile = (props) =>{
    const {state} = useContext(UserContext);

    return(
        <>
            <h1>This is  profile page</h1>
        </>
    )
}

export default Profile;