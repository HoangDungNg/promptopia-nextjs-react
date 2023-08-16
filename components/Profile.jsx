import React from 'react';
import { PromptCard } from '.';
import { useRouter } from 'next/navigation';
import { appStorage } from '@utils/MySessionStorage';

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  const router = useRouter();

  const handleTagClick = (tag) => {
    appStorage.store('SEARCH_DATA', {
      tag: tag,
    });
    router.push('/');
  };
  return (
    <session className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit?.(post)}
            handleDelete={() => handleDelete?.(post)}
            handleTagClick={handleTagClick}
          />
        ))}
      </div>
    </session>
  );
};

export default Profile;
