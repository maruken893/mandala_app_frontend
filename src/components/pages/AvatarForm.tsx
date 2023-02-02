import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthProvider';
import { updateAvatar } from '../../lib/api/user';
import AlertMessage from '../common/AlertMessagee';
import LoadingSpinner from '../common/LoadingSpinner';

const AvatarForm = () => {
  const [newImage, setNewImage] = useState<File>();
  const [newImagePreview, setNewImagePreview] = useState<string | null>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    message: '',
    isOpen: false,
  });
  const { state: auth } = useAuthContext();
  const navigate = useNavigate();

  console.log(newImage);

  const changeInputImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewImage(undefined);
    setNewImagePreview(null);

    if (e.target.files !== null) {
      const sizeKB = e.target.files[0].size / 1000;
      if (sizeKB > 2000) {
        setError({
          message: '画像ファイルのサイズが2MB超えています',
          isOpen: true,
        });
      } else {
        setError({
          message: '',
          isOpen: false,
        });
        setNewImage(e.target.files[0]);
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target !== null && typeof e.target.result === 'string') {
            setNewImagePreview(e.target.result);
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (newImage !== undefined) {
      await updateAvatar(newImage);
    }
    setIsLoading(false);
    navigate('/mypage', {
      state: {
        message: 'アバターを変更しました。更新されるまで少し時間がかかります。',
      },
    });
  };

  return (
    <div className="text-center mt-10">
      <h1 className="text-xl mb-2">アバターを変更</h1>
      <AlertMessage
        messageState={error}
        setMessageState={setError}
        color="bg-red-500"
      />
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
          onChange={(e) => changeInputImage(e)}
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
        {!isLoading ? (
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Upload
          </button>
        ) : (
          <LoadingSpinner />
        )}
      </form>
    </div>
  );
};

export default AvatarForm;
