import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Main() {
  const [posts, setPosts] = useState(null);
  const url = 'http://localhost:3000/api/post';
  const getPosts = async () => {
    const { data } = await axios.get(url);
    console.log(data);
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-md-10 mx-auto">
          <div className="post-preview">
            <a href="post.html">
              <h2 className="post-title">
                Science has not yet mastered prophecy
              </h2>
            </a>
            <p className="post-meta">on August 24, 2019</p>
          </div>
          <hr />

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
