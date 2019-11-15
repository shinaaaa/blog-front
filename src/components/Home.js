/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Main from './Main';
import TagList from './TagList';
import { baseURL } from '../config';

export default function Home() {
  const [posts, setPosts] = useState(null);
  const [tags, setTags] = useState(null);
  const [page, setPage] = useState(1);

  const getPosts = async (p = 1) => {
    const url = `${baseURL}/api/post?page=${p}`;
    const { data } = await axios.get(url);
    setPosts(data.posts);
  };
  const getPostsByTag = async (tag_id) => {
    const url = `${baseURL}/api/post?tag=${tag_id}`;
    const { data } = await axios.get(url);
    setPosts(data.posts);
  };
  const getNextPage = async () => {
    await getPosts(page + 1);
    setPage(page + 1);
  };

  const getTags = async () => {
    const url = `${baseURL}/api/tag`;
    const { data } = await axios.get(url);
    setTags(data.tags);
  };
  const getAll = async () => {
    await getPosts();
    await getTags();
  };
  useEffect(() => {
    getAll();
  }, []);
  return (
    <>
      <TagList tags={tags} getPostsByTag={getPostsByTag} />
      <Main posts={posts} getNextPage={getNextPage} />
    </>
  );
}
