import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../styles/UserDetails.css'
import BasicDetails from '../components/BasicDetails'
import Clock from '../components/Clock'
import UserPosts from '../components/UserPosts'
import useFetchUserDetails from '../hooks/useFetchUserDetails'

const UserDetail = () => {
  const { id } = useParams()
  const { user, loading, error } = useFetchUserDetails(id)
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div className="p-10">
      <div className="user-details-container">
        <div className="d-flex flex-row justify-between align-items-center">
          <div>
            <button className="btn" onClick={handleGoBack}>
              Back
            </button>
          </div>
          <Clock />
        </div>
        <h2>Profile Page</h2>
        {loading && <p>Loading user details...</p>}
        {error && <p>Error fetching user details: {error.message}</p>}
        {!loading && <BasicDetails user={user || {}} />}
        {!loading && <UserPosts userId={id} />}
      </div>
    </div>
  )
}

export default UserDetail
