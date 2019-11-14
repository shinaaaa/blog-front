import React from 'react';

export default function TagList({ tags }) {
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
