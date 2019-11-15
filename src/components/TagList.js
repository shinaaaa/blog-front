import React from 'react';

export default function TagList({ tags, getPostsByTag }) {
  return (
    <section>
      <ul>
        {tags
          && tags.map((tag) => (
            <li
              onClick={() => {
                getPostsByTag(tag._id);
              }}
            >
              {`${tag.name}(${tag.posts.length})`}
            </li>
          ))}
      </ul>
    </section>
  );
}
