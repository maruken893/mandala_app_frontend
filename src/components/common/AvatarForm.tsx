import { useState } from 'react';
import { updateAvatar } from '../../lib/api/user';

const AvatarForm = () => {
  const [file, setFile] = useState();

  const changeInputImage = (e: any) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    // const avatar = e.target.files[0];
    console.log();
    const res = await updateAvatar(file);
    // console.log(res);
  };

  // handleImageChange = (e) => {
  //   setFile(e.target.)
  // }

  return (
    <>
      <h1>アバターを変更</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <label htmlFor="avatar">画像</label>
        <input
          type="file"
          name="avatar"
          accept="image/png, image/jpeg"
          onChange={changeInputImage}
        />
        <br />
        <button type="submit">Upload</button>
      </form>
    </>
  );
};

export default AvatarForm;
