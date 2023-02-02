import { useState } from 'react';
// import TextareaAutosize from 'react-textarea-autosize';

import { createPost } from '../../lib/api/post';
import { useAuthContext } from '../../context/AuthProvider';
import { Post } from '../../interfaces/util';

const PostInput: React.FC<{
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}> = ({ setPosts }) => {
  const [postInput, setPostInput] = useState('');
  const { state: auth } = useAuthContext();

  const changePostInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length < 100) {
      setPostInput(e.target.value);
    }
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (postInput.length !== 0 && postInput.length <= 100) {
      const res = await createPost(auth.currentUser, postInput);
      setPostInput('');
      setPosts((prev) => [res?.data.newPost, ...prev]);
    }
  };

  return (
    <div className="flex">
      <div className="">
        {auth.avatarUrl ? (
          <img
            src={auth.avatarUrl}
            className="w-20 shadow-xl rounded-full align-middle border-none"
          />
        ) : (
          <img
            src="default-avatar.png"
            className="w-20 shadow-xl rounded-full align-middle border-none"
          />
        )}
        <p className="mt-1 text-xl text-center">{auth.currentUser.name}</p>
      </div>
      <form action="" className="grow text-center mb-5 ml-5">
        <textarea
          className="mr-0 p-2 w-full resize-none border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          name="postInput"
          value={postInput}
          onChange={changePostInput}
          placeholder="postを投稿する(100文字以下)"
          rows={2}
        />
        <button
          className="py-2 px-10 mt-1 rounded-md bg-blue-500 text-white text-sm"
          onClick={(e) => handleSubmit(e)}
        >
          投稿する
        </button>
      </form>
    </div>
  );
};

export default PostInput;
