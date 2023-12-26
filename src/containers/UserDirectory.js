import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/UserList.css'
import useFetchUsers from '../hooks/useFetchUsers'

const UserDirectory = () => {
  const { users, loading, error } = useFetchUsers()

  return (
    <div className="p-10">
      <div className="user-directory-container">
        <div className="heading">
          <h2>User Directory</h2>
        </div>
        <div className="list">
          {loading && <span className="p-10">Loading...</span>}
          {error && (
            <span className="p-10">Error fetching users: {error.message}</span>
          )}

          {!loading && users.length > 0 ? (
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                  <Link to={`/user/${user.id}`}>
                    <div className="d-flex justify-between">
                      <span>Name: {user.name}</span>
                      <div>Id: {user.id}</div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserDirectory
