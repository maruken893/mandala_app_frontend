import { useState } from 'react';

import PostFeed from '../post/PostFeed';
import PostInput from '../post/PostInput';
import { Post } from '../../interfaces/util';

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
