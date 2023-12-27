import React from 'react'
import '../styles/UserPosts.css'
import useFetchUserPosts from '../hooks/useFetchUserPosts';

const UserPosts = ({ userId }) => {
  const { posts, loading, error } = useFetchUserPosts(userId);


  return (
    <div className="post-cards-container">
      <div className="post-cards">
        {loading && <p>Loading posts...</p>}
        {error && <p>Error fetching posts: {error.message}</p>}
        {!loading && posts.map((post) => (
          <div key={post.id} className="each-post-card">
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserPosts
