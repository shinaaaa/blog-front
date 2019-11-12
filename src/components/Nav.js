import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light fixed-top"
      id="mainNav"
    >
      <div className="container">
        <a className="navbar-brand" href="index.html">
          빈산님의 블로그
        </a>
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
        >
          Menu
          <i className="fas fa-bars" />
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarResponsive"
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                로그인
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
