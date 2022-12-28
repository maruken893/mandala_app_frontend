import React from 'react';

interface Post {
  content: string;
  date: Date;
}

const Post: React.FC<any> = ({ post }) => {
  return <li>{post.content}</li>;
};

export default Post;
