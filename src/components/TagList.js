import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TagList() {
  const [tags, setTags] = useState(null);
  const url = 'http://localhost:3000/api/tag';
  const getTag = async () => {
    const { data } = await axios.get(url);
    setTags(data.tags);
  };
  useEffect(() => {
    getTag();
  }, []);
  return (
    <section>
      <ul>
        {tags
          && tags.map((tag) => (
            <li>{`${tag.name}(${tag.posts.length})`}</li>
          ))}
      </ul>
    </section>
  );
}
