import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { SignUpParams } from '../../interfaces/auth';
import { signUp } from '../../lib/api/auth';
import { useAuthContext } from '../../context/AuthProvider';
import AlertMessage from '../common/AlertMessagee';

interface MessageState {
  message: string;
  isOpen: boolean;
}

const SignUp: React.FC = () => {
  const [signUpParams, setSignUpParams] = useState<SignUpParams>({
    email: '',
    name: '',
    password: '',
    passwordConfirmation: '',
  });
  const [messageState, setMessageState] = useState<MessageState>({
    message: '',
    isOpen: false,
  });
  const { dispatch: authDispatch } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpParams((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      const res = await signUp(signUpParams);

      const access_token = res.headers['access-token'];
      const client = res.headers['client'];
      const uid = res.headers['uid'];

      if (res.status === 200) {
        if (typeof access_token === 'string')
          Cookies.set('_access_token', access_token);
        if (typeof client === 'string') Cookies.set('_client', client);
        if (typeof uid === 'string') Cookies.set('_uid', uid);

        authDispatch({ type: 'signin' });
        authDispatch({ type: 'setUser', payload: { user: res.data.data } });

        navigate('/');
      }
      // FIXME: errにanyを使ってる
    } catch (err: any) {
      console.log(err);
      if (err.response.status === 422) {
        setMessageState({
          message: '入力情報が正しくありません',
          isOpen: true,
        });
      }
    }
  };

  return (
    <div className="relative my-8">
      <AlertMessage
        messageState={messageState}
        setMessageState={setMessageState}
      />
      <div className="w-4/5 p-6 m-auto bg-white text-gray-700 rounded-md border border-zinc-100 shadow-xl lg:max-w-2xl">
        <h1 className="text-3xl font-semibold text-center uppercase">
          ユーザー登録
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              メールアドレス <span className="text-xs font-light">*必須</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => {
                handleChange(e);
              }}
              className="block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-800"
            >
              名前 <span className="text-xs font-light">*必須</span>
            </label>
            <input
              type="name"
              name="name"
              id="name"
              onChange={(e) => {
                handleChange(e);
              }}
              className="block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
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
              onChange={(e) => {
                handleChange(e);
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
              onChange={(e) => {
                handleChange(e);
              }}
              className="block w-full px-4 py-2 mt-2  bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6  mx-auto w-1/3">
            <button
              onClick={(e) => handleSubmit(e)}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-600 rounded-lg hover:bg-blue-600 hover:opacity-90 focus:outline-none focus:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
