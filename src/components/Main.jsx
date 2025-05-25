import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GetData } from '../Services/api';

export default function Main() {
  const [post, setPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    userId: ''
  });
  const [message, setMessage] = useState('');

  // Fetch existing post on mount
  useEffect(() => {
    GetData()
      .then((response) => setPost(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('https://jsonplaceholder.typicode.com/posts', formData)
      .then(response => {
        setMessage('Post created successfully!');
        console.log('POST Response:', response.data);
      })
      .catch(error => {
        console.error('POST Error:', error);
        setMessage('Error creating post');
      });
  };

  return (
    <div>
      <h1>API Data</h1>
      {post ? (
        <div>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <hr />

      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        /><br /><br />
        <textarea
          name="body"
          placeholder="Body"
          value={formData.body}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          type="number"
          name="userId"
          placeholder="User ID"
          value={formData.userId}
          onChange={handleChange}
          required
        /><br /><br />
        <button type="submit">Create Post</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
