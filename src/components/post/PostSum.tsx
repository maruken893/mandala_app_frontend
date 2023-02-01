import { useState } from 'react';

import PostFeed from '../post/PostFeed';
import PostInput from '../post/PostInput';

interface Post {
  id: number;
  content: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}

const PostSum = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  return (
    <>
      <PostInput setPosts={setPosts} />
      <PostFeed posts={posts} setPosts={setPosts} />
    </>
  );
};

export default PostSum;
