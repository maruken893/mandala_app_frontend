import React, { useState } from 'react';
import { Navigate, useSearchParams, useNavigate } from 'react-router-dom';
import { changePassword } from '../../lib/api/user';
import AlertMessage from '../common/AlertMessagee';

const ChangePassword = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState({ message: '', isOpen: false });
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const accessToken = searchParams.get('access-token');
  const client = searchParams.get('client');
  const uid = searchParams.get('uid');

  console.log(client);
  console.log(uid);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === '' || passwordConfirmation === '') {
      setError({ message: 'パスワードが空です', isOpen: true });
    } else if (password !== passwordConfirmation) {
      setError({ message: 'パスワードが揃っていません', isOpen: true });
    } else {
      if (
        typeof accessToken === 'string' &&
        typeof client === 'string' &&
        typeof uid === 'string'
      ) {
        await changePassword({
          password,
          passwordConfirmation,
          accessToken,
          client,
          uid,
        });
        navigate('/signin', {
          state: {
            message: 'パスワードが変更されました',
          },
        });
      } else {
        setError({ message: 'パスワードが揃っていません', isOpen: true });
      }
    }
  };

  return (
    <div className="relative my-8">
      <AlertMessage
        messageState={error}
        setMessageState={setError}
        color="bg-red-500"
      />
      <div className="w-4/5 p-6 m-auto bg-white text-gray-700 rounded-md border border-zinc-100 shadow-xl lg:max-w-2xl">
        <h1 className="text-3xl font-semibold text-center uppercase">
          ユーザー登録
        </h1>
        <form className="mt-6" onSubmit={onSubmit}>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              パスワード <span className="text-xs font-light">*必須</span>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="block w-full px-4 py-2 mt-2  bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="passwordConfirmation"
              className="block text-sm font-semibold text-gray-800"
            >
              パスワード(確認) <span className="text-xs font-light">*必須</span>
            </label>
            <input
              type="password"
              name="passwordConfirmation"
              id="passwordConfirmation"
              value={passwordConfirmation}
              onChange={(e) => {
                setPasswordConfirmation(e.target.value);
              }}
              className="block w-full px-4 py-2 mt-2  bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6  mx-auto w-1/3">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-600 rounded-lg hover:bg-blue-600 hover:opacity-90 focus:outline-none focus:bg-blue-600">
              パスワードを変更する
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
