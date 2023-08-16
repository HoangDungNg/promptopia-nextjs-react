'use client';
import React from 'react';

import { PromptCard } from '@components';
import { useDebounce } from '@hooks/useDebounce';
import { appStorage } from '@utils/MySessionStorage';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const searchType1 = 'SEARCH_CONTENT_AND_USERNAME';
const searchType2 = 'SEARCH_TAG';

const cleanSearchKey = (str) => String(str).replace('#', '');
const defineSearchType = (str) =>
  str.includes('#') ? searchType2 : searchType1;

const PromptCardList = ({ data, handleTagClick, onProfileClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data?.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          onProfileClick={onProfileClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = React.useState('');
  const [posts, setPosts] = React.useState([]);
  const [inputChange, setInputChange] = React.useState(false);
  const { data: session } = useSession();
  const debounceSearchTerm = useDebounce(searchText, 500);
  const router = useRouter();

  const searchData = React.useMemo(() => {
    if (!inputChange) {
      return appStorage.get('SEARCH_DATA');
    } else return;
  }, [inputChange]);

  const handleSearchChange = (e) => {
    setInputChange(true);
    if (searchData) appStorage.clear();
    setSearchText(e.target.value);
  };

  const handleOnProfileClick = (post) => {
    if (post.creator._id === session.user.id) {
      router.push('/profile');
    } else {
      router.push(`/profile/${post.creator._id}`);
    }
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
  };

  React.useEffect(() => {
    const fetchSearchPosts = async () => {
      const response = await fetch(
        `/api/prompt?keyword=${cleanSearchKey(
          searchData?.tag ?? debounceSearchTerm
        )}&searchType=${defineSearchType(
          searchData?.tag ?? debounceSearchTerm
        )}`
      );
      const data = await response.json();
      setPosts(data);
    };
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
    };

    if (!!searchData || !!debounceSearchTerm) fetchSearchPosts();
    else fetchPosts();
  }, [debounceSearchTerm, searchData]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={inputChange ? searchText : searchData?.tag}
          onChange={handleSearchChange}
          required
          className="search_input peer"
          id="search-field"
        />
      </form>

      <PromptCardList
        data={posts}
        handleTagClick={handleTagClick}
        onProfileClick={handleOnProfileClick}
      />
    </section>
  );
};

export default Feed;
