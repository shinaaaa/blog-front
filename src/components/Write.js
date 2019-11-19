import React, { useState, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { baseURL } from '../config';
import authAxios from './authAxios';
import getCookie from './getCookie';

export default function Write({ history }) {
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState([]);
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [isAdmin, setIsAdmin] = useState('init');

    useEffect(() => {
        /* 관리자 권한 인증 부분 */
        if (document.cookie.includes('Authorization')) {
            const jwt = getCookie('Authorization').split(' ')[1];
            const payload = jwt.split('.')[1];
            const { admin } = JSON.parse(atob(payload)); /* base64 Decoding */
            setIsAdmin(admin);
        }
    }, []);

    const addTag = async () => {
        const res = await axios.get(`${baseURL}/api/tag/${tag}`);
        if (res.data.error) {
            const { data } = await axios.post(`${baseURL}/api/tag`, {
                name: tag,
            });
            setTags([...tags, data.tag]);
            setTag('');
        } else {
            setTags([...tags, res.data.tag]);
            setTag('');
        }
    };
    const deleteTag = (i) => {
        const newTags = [...tags];
        newTags.splice(i, 1);
        setTags(newTags);
    };
    const submit = async () => {
        const { data } = await authAxios.post(`${baseURL}/api/post`, {
            title,
            contents,
            tags: tags.map((t) => t._id),
        });
        if (data.result) history.push('/');
        else {
            alert('관리자에게 문의');
        }
    };
    return (
        <>
            {isAdmin === 'true' ? null : (<Redirect to="/" />)}
            <label>태그 추가</label>
            <input type="text" value={tag} onChange={(e) => setTag(e.target.value)} />
            <button type="button" className="btn btn-success" onClick={addTag}>
                태그 추가
          </button>
            <div>
                {tags.map(({ name }, i) => (
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => deleteTag(i)}
                    >
                        {name}
                    </button>
                ))}
            </div>
            <div className="write">
                <div className="write-vertical">
                    <label>제목</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label>내용</label>
                    <TextareaAutosize
                        value={contents}
                        onChange={(e) => {
                            setContents(e.target.value);
                        }}
                    />
                    <button type="button" className="btn btn-primary" onClick={submit}>
                        제출
                  </button>
                </div>
                <div>
                    <ReactMarkdown source={contents} />
                </div>
            </div>
        </>
    );
}
