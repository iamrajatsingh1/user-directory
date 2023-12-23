import React from 'react';
import { Link } from 'react-router-dom';

const UserList = ({ users }) => {
    return (
        <div className='list'>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <Link to={`/user/${user.id}`}>
                <div className='d-flex justify-between'>
                  <div>
                  <span>
                    Name: {user.name}
                  </span>
                  </div>
                  <div>
                    Id: {user.id}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
};

export default UserList;