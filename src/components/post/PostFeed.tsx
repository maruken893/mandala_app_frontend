import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Cookies from 'js-cookie';

import { fetchPosts } from '../../lib/api/post';
import { useAuthContext } from '../../context/AuthProvider';

interface Post {
  id: number;
  content: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}

const PostFeed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { state: auth } = useAuthContext();

  const loadMore = async (page: number) => {
    const res = await fetchPosts({ id: Cookies.get('_id') }, page);
    const newPosts = res.data.data.posts;

    console.log(page);
    console.log(res.data.data.posts);
    if (newPosts.length < 1) {
      setHasMore(false);
      return;
    }
    setPosts((prev) => [...prev, ...newPosts]);
  };

  const loader = (
    <div className="loader" key={0}>
      Loading...
    </div>
  );

  return (
    <div className="w-full h-3/4 border border-green-700 overflow-scroll">
      <InfiniteScroll
        className="h-80"
        loadMore={loadMore}
        hasMore={hasMore}
        loader={loader}
        useWindow={false}
      >
        <ul className="">
          {posts.map((post) => (
            <li key={post.id}>{post.content}</li>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
};

export default PostFeed;