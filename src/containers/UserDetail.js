// UserDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/UserDetails.css";

import BasicDetails from '../components/BasicDetails';
import Clock from '../components/Clock';
import UserPosts from '../components/UserPosts';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const navigate = useNavigate();


  useEffect(() => {
    // Fetch user details based on the id parameter
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => {
        setUser(response.data);
      });
  }, [id]);

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };


  return (
    <div className='p-10'>
      <div className='user-details-container'>
        <div className='d-flex flex-row justify-between'>
          <div>
            <button className='btn' onClick={handleGoBack}>Back</button>
          </div>
          <Clock />
        </div>
        <h2>Profile Page</h2>
        <BasicDetails user={user || {}} />
        <UserPosts userId={id} />
      </div>
    </div>
  );
};

export default UserDetail;
