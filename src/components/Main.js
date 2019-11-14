import React from 'react';
import { Link } from 'react-router-dom';

export default function Main({ posts }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-md-10 mx-auto">
          {posts
            && posts.map((post) => (
              <div className="post-preview">
                <Link to={`/post/${post._id}`}>
                  <h2 className="post-title">
                    {post.title}
                  </h2>
                </Link>
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
