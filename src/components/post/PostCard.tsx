import React from 'react';

interface Post {
  content: string;
  date?: Date;
}

const PostCard: React.FC<{
  post: Post;
  username: string;
  avatarUrl: string;
}> = ({ post, username, avatarUrl }) => {
  return (
    <li>
      <div className="pb-3 border round-sm">
        <div className="flex items-center my-2 ml-2">
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
        <p className="pl-16 tex-sm">{post.content}</p>
      </div>
    </li>
  );
};

export default PostCard;
