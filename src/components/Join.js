import React, { useState } from 'react';
import axois from 'axios';
import { Redirect } from 'react-router-dom';
import { baseURL } from '../config';

export default function Join() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [isEmailChecked, setIsEmailChecked] = useState('yet');
    const [isPasswordSame, setIsPasswordSame] = useState(false);
    const [joinResult, setJoinResult] = useState(false);
    const checkEmail = async () => {
        const { data } = await axois.get(`${baseURL}/auth/email?email=${email}`);
        setIsEmailChecked(data.result);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isEmailChecked || isEmailChecked === 'yet') {
            alert('이메일 중복을 확인하세요');
            return;
        }
        if (!e.target.name.value || !email || !password) {
            alert('모든 값을 입력해주세요');
            return;
        }
        const { data } = await axois.post(`${baseURL}/auth/join`, {
            name: e.target.name.value,
            email,
            password,
        });
        if (data.result) {
            setJoinResult(true);
        } else {
            alert('회원 가입 실패 관리자에게 문의하세요.');
        }
    };
    return (
        <div>
            {joinResult && <Redirect to='/Login' />}
            <form onSubmit={handleSubmit} >
                <div class="form-group">
                    <label>별명</label>
                    <input type="text" name='name' class="form-control" placeholder="블로그에서 사용할 이름" />
                </div>
                <div class="form-group">
                    <label>이메일 주소</label>
                    <input type="email" class="form-control" placeholder="Enter email" value={email} onChange={e => {
                        setIsEmailChecked("yet");
                        setEmail(e.target.value);
                    }}
                    />
                    <button type="button" class="btn btn-primary" onClick={checkEmail}>이메일 중복 체크</button>
                    {isEmailChecked === 'yet' ? '중복체크를 해주세요' : isEmailChecked ? '이 이메일은 사용가능합니다.' : '이 이메일은 사용 불가능 합니다.'}
                </div>
                <div class="form-group">
                    <label>비밀번호</label>
                    <input type="password" class="form-control" placeholder="Password" value={password}
                        onChange={e => {
                            setPassword(e.target.value);
                            setIsPasswordSame(e.target.value === password2);
                        }}
                    />
                </div>
                <div class="form-group">
                    <label>비밀번호확인</label>
                    <input type="password" class="form-control" placeholder="Password" value={password2}
                        onChange={e => {
                            setPassword2(e.target.value);
                            setIsPasswordSame(e.target.value === password);
                        }}
                    />
                </div>
                <small>{isPasswordSame ? null : '비밀번호가 일치하지 않습니다.'}</small>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div >
    )
}
