import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../styles/UserList.css";

const UserDirectory = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch(e => {
        console.error("Error while fetching users", e)
      });

  }, []);

  return (
    <div className='p-10'>
      <div className='user-directory-container'>
        <div className='heading'>
          <h2>User Directory</h2>
        </div>
        <div className='list'>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <Link to={`/user/${user.id}`}>
                  <div className='d-flex justify-between'>
                    <span>
                      Name: {user.name}
                    </span>
                    <div>
                      Id: {user.id}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserDirectory;
