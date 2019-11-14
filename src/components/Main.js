import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Main() {
  const [posts, setPosts] = useState(null);
  const url = 'http://localhost:3000/api/post';
  const getPosts = async () => {
    const { data } = await axios.get(url);
    setPosts(data.posts);
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-md-10 mx-auto">
          {posts
            && posts.map((post) => (
              <div className="post-preview">
                <a href="post.html">
                  <h2 className="post-title">
                    {post.title}
                  </h2>
                </a>
                <p className="post-meta">{post.date}</p>
              </div>
            ))}
          <div className="clearfix">
            <a
              className="btn btn-primary float-right"
              href="#"
            >
              Older Posts &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
