import { useState } from 'react';
// import TextareaAutosize from 'react-textarea-autosize';

// formのライブラリ: https://www.npmjs.com/package/react-hook-form

import { createPost } from '../../lib/api/post';
import { useAuthContext } from '../../context/AuthProvider';

const PostInput = () => {
  const [postInput, setPostInput] = useState('');
  const { state: auth } = useAuthContext();

  const changePostInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostInput(e.target.value);
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await createPost(auth.currentUser, postInput);
    setPostInput('');
  };

  return (
    <div className="">
      <form action="" className="text-center p-3">
        <textarea
          className="mr-0 p-2 w-full resize-none border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          name="postInput"
          value={postInput}
          onChange={changePostInput}
          placeholder="postを投稿する..."
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
