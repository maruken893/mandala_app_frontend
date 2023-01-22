import React from 'react';

interface Post {
  content: string;
  date: Date;
}

const PostCard: React.FC<any> = ({ post, username, avatarUrl }) => {
  return (
    <li>
      <div className="pb-3 border round-sm">
        <div className="flex items-center my-2 ml-2">
          <img
            src={avatarUrl}
            className="w-10 shadow-xl rounded-full align-middle border-none"
          />
          <p className="pl-4 text-lg">{username}</p>
        </div>
        <p className="pl-16">{post.content}</p>
      </div>
    </li>
  );
};

export default PostCard;
