import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { localURL } from '../config';

export default function Post({ match }) {
  const [post, setPost] = useState(null);
  const getPost = async () => {
    const url = `${localURL}/api/post/${match.params.id}`;
    const { data } = await axios.get(url);
    setPost(data);
  };
  useEffect(() => {
    getPost();
  }, []);
  return (
    <>
      <h1>{post && post.title}</h1>
      <p>{post && post.contents}</p>
    </>
  );
}
