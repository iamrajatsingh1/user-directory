import React, { useEffect, useState } from 'react'
import '../styles/UserPosts.css'
import axios from 'axios'

const UserPosts = ({ userId }) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((response) => {
        setPosts(response.data)
      })
  }, [userId])

  return (
    <div className="post-cards-container">
      <div className="post-cards">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserPosts
