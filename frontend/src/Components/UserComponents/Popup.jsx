import React from "react";

const Popup = ({udata, handlePopup}) => {
    return(
        <>
            <div className="popupContainer">
                <div className="popup">
                    <div className='close'>
                        <button className="closeBtn" onClick={handlePopup}>close</button>
                    </div>
                    <div className="userDetails">
                        <h1>Name: {udata.name}</h1>
                        <h1>E-mail: {udata.email}</h1>
                        <h1>Phone Number: {udata.number}</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Popup;