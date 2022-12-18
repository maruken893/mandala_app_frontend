import { useEffect, useState } from 'react';

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
  const { state: auth } = useAuthContext();

  const getPosts = async () => {
    const res = await fetchPosts(auth.currentUser);
    setPosts(res.data);
  };

  useEffect(() => {
    if (auth.currentUser) {
      getPosts();
    }
  }, [auth]);
  return <div>PostFeed</div>;
};

export default PostFeed;
