import React, { useState } from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { baseURL } from '../config';

export default function Login({ setIsLoggedIn, setIsAdmin, history }) {
  const [loginState, setLoginState] = useState('init');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await Axios.post(`${baseURL}/auth/login`, {
      email: e.target.email.value,
      password: e.target.password.value,
    });
    if (!data.result) {
      setLoginState('feiled');
    } else {
      const { exp } = JSON.parse(atob(data.token.split('.')[1])); /* base64 Decoding */
      const exprires = new Date(exp * 1000).toUTCString();
      document.cookie = `Authorization=JWT ${data.token}; exprires=${exprires}`;
      setIsAdmin(data.admin);
      setIsLoggedIn(true);
      setLoginState('success');
    }
  };
  return (
    <>
      {loginState === 'success' ? (<Redirect to="/" />) : null}
      <form onSubmit={handleSubmit}>
        <small>{loginState === 'failed' && '이메일 혹은 비밀번호를 추가해 주세요'}</small>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" className="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" className="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
        <button type="button" class="btn btn-secondary" onClick={() => history.pushState('/join')}>회원가입</button>
      </form>
    </>
  );
}
