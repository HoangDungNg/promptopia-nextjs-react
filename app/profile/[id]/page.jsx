'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

import { Profile as ProfileComponent } from '@components';

const MyProfile = (props) => {
  const router = useRouter();
  const [posts, setPosts] = React.useState([]);
  const [profile, setProfile] = React.useState({});
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      'Are you sure you want to delete this prompt?'
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id}`, {
          method: 'DELETE',
        });

        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (err) {
        console.error(err);
      }
    }
  };

  React.useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${props.params.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    const fetchProfile = async () => {
      const response = await fetch(`/api/users/${props.params.id}`);
      const profileData = await response.json();
      setProfile(profileData);
    };

    if (props.params.id) {
      fetchProfile();
      fetchPosts();
    }
  }, [props.params.id]);
  return (
    <React.Fragment>
      {profile.username && (
        <ProfileComponent
          name={profile?.username}
          desc={`Welcome to ${profile?.username}'s profile page`}
          data={posts}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}
    </React.Fragment>
  );
};

export default MyProfile;
