import React from 'react';
import homeBg from '../static/image/home-bg.jpg';

export default function Header() {
  return (
    <header
      className="masthead"
      style={{ backgroundImage: `url(${homeBg})` }}
    >
      <div className="overlay" />
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            <div className="site-heading">
              <h1>화곡동 페이커</h1>
              <span className="subheading">화곡동 개발 짱</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
