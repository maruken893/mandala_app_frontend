import React from 'react';
import moment from 'moment';

interface Post {
  id: number;
  content: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

const PostCard: React.FC<{
  post: Post;
  username: string;
  avatarUrl: string;
}> = ({ post, username, avatarUrl }) => {
  return (
    <li>
      <div className="pt-3 pb-6 border round-sm relative">
        <div className="flex items-center mt-2 ml-2">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              className="w-10 shadow-xl rounded-full align-middle border-none"
            />
          ) : (
            <img
              src="default-avatar.png"
              className="shadow-xl rounded-full align-middle border-none w-10 "
            />
          )}
          <p className="pl-4 text-lg font-medium">{username}</p>
        </div>
        <p className="pl-16 pr-2 tex-sm">{post.content}</p>
        <span className="text-sm absolute right-4 bottom-1">
          {moment(post.createdAt).format('ll')}
        </span>
      </div>
    </li>
  );
};

export default PostCard;
