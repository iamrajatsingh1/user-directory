import React from "react";

const BasicDetails = ({ user }) => {
    return <div className='user-basic-details p-10'>
        <div className='d-flex justify-between p-10'>
            <span>Name: {user?.name}</span>
            <span>Address: {user?.address?.street} {user?.address?.suite} {user?.address?.city}</span>
        </div>
        <div className='d-flex justify-between p-10'>
            <span>Username: {user?.username}</span>
            <span>Email: {user?.email}</span>
        </div>
    </div>
};

export default BasicDetails;