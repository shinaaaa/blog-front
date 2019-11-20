import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getCookie from './getCookie';

export default function Nav({ isLoggedIn, setIsLoggedIn, setIsAdmin, isAdmin }) {
  const [isCollapsed, setisCollapsed] = useState(true);
  const [isMenuOpened, setisMenuOpened] = useState(false);
  const logout = () => {
    document.cookie = `Authorization=; expires=${new Date().toUTCString()}`;
    setIsLoggedIn(false);
    setIsAdmin(false);
  };
  useEffect(() => {
    setIsLoggedIn(document.cookie.includes('Authorization'));

    /* 관리자 권한 인증 부분 */
    if (document.cookie.includes('Authorization')) {
      const jwt = getCookie('Authorization').split(' ')[1];
      const payload = jwt.split('.')[1];
      const { admin } = JSON.parse(atob(payload)); /* base64 Decoding */
      setIsAdmin(admin);
    }
  }, []);
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light fixed-top"
      id="mainNav"
    >
      <div className="container">
        <a className="navbar-brand" href="index.html">
          신의 블로그
        </a>
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          onClick={() => { setisCollapsed(!isCollapsed); setisMenuOpened(!isMenuOpened); }}
        >
          Menu
          <i className="fas fa-bars" />
        </button>
        <div
          className={`collapse navbar-collapse ${!isCollapsed && 'show'}`}
          id="navbarResponsive"
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={() => { setisCollapsed(!isCollapsed); setisMenuOpened(!isMenuOpened); }}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              {isLoggedIn ? <a className='nav-link' onClick={logout}>로그아웃</a> : (
                <Link className="nav-link" to="/login"
                  onClick={() => { setisCollapsed(!isCollapsed); setisMenuOpened(!isMenuOpened); }}
                >
                  로그인
                </Link>
              )}
            </li>
            {isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/write" onClick={() => { setisCollapsed(!isCollapsed); setisMenuOpened(!isMenuOpened); }}>글쓰기</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav >
  );
}
