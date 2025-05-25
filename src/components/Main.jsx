import React, { useEffect, useState } from 'react'
import { GetData } from '../Services/api'; // Adjust the path based on your structure

export default function Main() {
  const [post, setPost] = useState(null)

  useEffect(() => {
    GetData()
      .then((response) => setPost(response.data))
      .catch((error) => console.error('Error fetching data:', error))
  }, [])

  return (
    <div>
      <h1>Api Data</h1>
      {post ? (
        <div>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
