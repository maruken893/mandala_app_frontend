import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Cookies from 'js-cookie';

import { fetchPosts } from '../../lib/api/post';
import { useAuthContext } from '../../context/AuthProvider';
import PostCard from './PostCard';

interface Post {
  id: number;
  content: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

const PostFeed: React.FC<{
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}> = ({ posts, setPosts }) => {
  const [hasMore, setHasMore] = useState(true);
  const { state: auth } = useAuthContext();

  const loadMore = async (page: number) => {
    const id = Number(Cookies.get('_id'));

    const res = await fetchPosts({ id: id }, page);
    const newPosts = res.data.data.posts;
    if (newPosts.length < 1) {
      setHasMore(false);
      return;
    }
    setPosts([...posts, ...newPosts]);
  };

  const loader = (
    <div className="loader" key={0}>
      Loading...
    </div>
  );

  return (
    <div className="w-full h-3/4 border border-zinc-400 rounded-sm overflow-scroll">
      <InfiniteScroll
        className="h-80"
        loadMore={loadMore}
        hasMore={hasMore}
        loader={loader}
        useWindow={false}
      >
        <ul className="p-4">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              username={auth?.currentUser.name}
              avatarUrl={auth?.avatarUrl}
            />
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
};

export default PostFeed;
