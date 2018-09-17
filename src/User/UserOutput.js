import React from 'react';
import './User.css';


const UserOutput = ( props ) => {
    return (
        <div className="User">
            <p>Username: {props.username}</p>
            <p>{props.other}</p>
        </div>
    )
};

export default UserOutput;


