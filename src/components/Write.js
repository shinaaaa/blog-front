import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import { baseURL } from '../common/config';
import authAxios from '../common/authAxios';

export default function Write({ history }) {
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState([]);
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');

    const addTag = async () => {
        const res = await axios.get(
            `${baseURL}/api/tag/${tag}`,
        );
        if (res.data.error) {
            const { data } = await axios.post(
                `${baseURL}/api/tag`,
                {
                    name: tag,
                },
            );
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
        const { data } = await authAxios().post(
            `${baseURL}/api/post`,
            {
                title,
                contents,
                tags: tags.map((t) => t._id),
            },
        );
        if (data.result) history.push('/');
        else {
            alert(
                '글이 등록되지 않음ㅜㅜ, 관리자=너 에게 문의하세요',
            );
        }
    };

    return (
        <>
            <label>태그 추가</label>
            <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
            />
            <button
                type="button"
                className="btn btn-success"
                onClick={addTag}
            >
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
                        onChange={(e) => setContents(e.target.value)}
                    />
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={submit}
                    >
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