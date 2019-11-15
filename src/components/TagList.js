import React, { useState } from 'react';
import './TagList.css';

export default function TagList({ tags, getPostsByTag }) {
  const [active, setActive] = useState(null);

  return (
    <section>
      <ul>
        {tags
          && tags.map((tag, i) => (
            <li
              onClick={() => {
                getPostsByTag(tag._id);
                setActive(i);
              }}
              className={
                active === i ? 'tag-active tag' : 'tag'
              }
            >
              {`${tag.name}(${tag.posts.length})`}
            </li>
          ))}
      </ul>
    </section>
  );
}
