import React from 'react'
import '../styles/BasicDetails.css'

const BasicDetails = ({ user }) => {
  return (
    <div className="user-basic-details">
      <div className="flex-container">
        <span>
          <strong>Name:</strong> {user?.name}
        </span>
        <span>
          <strong>Address:</strong> {user?.address?.street}{' '}
          {user?.address?.suite} {user?.address?.city}
        </span>
      </div>
      <div className="flex-container">
        <span>
          <strong>Username:</strong> {user?.username}
        </span>
        <span>
          <strong>Email:</strong> {user?.email}
        </span>
      </div>
    </div>
  )
}

export default BasicDetails
