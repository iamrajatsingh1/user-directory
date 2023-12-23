import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/UserList.css";
import UserList from '../components/UserList';

const UserDirectory = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (users.length === 0) {
      axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
        setUsers(response.data);
      });
    }
  }, [users]);

  return (
    <div className='p-10'>
      <div className='user-directory-container'>
        <div className='heading'>
          <h2>User Directory</h2>
        </div>
        <UserList users={users} />
      </div>
    </div>
  );
};

export default UserDirectory;
