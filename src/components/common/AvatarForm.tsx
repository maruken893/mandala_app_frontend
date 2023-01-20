import { useState } from 'react';
import { useAuthContext } from '../../context/AuthProvider';
import { updateAvatar } from '../../lib/api/user';

const AvatarForm = () => {
  const [newImage, setNewImage] = useState();
  const [newImagePreview, setNewImagePreview] = useState();
  const { state: auth } = useAuthContext();

  const changeInputImage = (e: any) => {
    setNewImage(undefined);
    setNewImagePreview(undefined);
    setNewImage(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = (e: any) => {
      setNewImagePreview(e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    // const avatar = e.target.files[0];
    await updateAvatar(newImage);
  };

  return (
    <div className="text-center mt-10">
      <h1 className="text-xl mb-2">アバターを変更</h1>
      <div className="mb-5">
        <p className="mb-1">現在のアバター</p>
        <img
          src={auth.avatarUrl}
          className="shadow-xl rounded-full align-middle border-none max-w-[150px] max-h-[150px] mx-auto"
        />
      </div>
      <form onSubmit={(e) => onSubmit(e)}>
        <label htmlFor="avatar">画像</label>
        <input
          type="file"
          name="avatar"
          accept="image/png, image/jpeg"
          onChange={changeInputImage}
          className="mb-2"
        />
        <br />
        {!!newImagePreview && (
          <div className="my-5">
            <h2 className="mb-2">新しいアバター</h2>
            <img
              src={newImagePreview}
              className="shadow-xl rounded-full align-middle border-none max-w-[150px] max-h-[150px] mx-auto"
            />
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default AvatarForm;
