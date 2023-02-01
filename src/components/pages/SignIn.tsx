import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

import { SignInParams } from '../../interfaces/auth';
import { getCurrentUser, signIn } from '../../lib/api/auth';
import { useAuthContext } from '../../context/AuthProvider';

import AlertMessage from '../common/AlertMessagee';
import { User } from '../../interfaces/auth';

interface MessageState {
  message: string;
  isOpen: boolean;
}

const SignIn: React.FC = () => {
  const [authParams, setAuthParams] = useState<SignInParams>({
    email: '',
    password: '',
  });
  const [messageState, setMessageState] = useState<MessageState>({
    message: '',
    isOpen: false,
  });
  const [emailMessageState, setEmailMessageState] = useState<MessageState>({
    message: '',
    isOpen: false,
  });
  const { state } = useLocation();
  const navigate = useNavigate();
  const { dispatch: authDispatch } = useAuthContext();

  useEffect(() => {
    setEmailMessageState({ message: state?.message, isOpen: !!state?.message });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthParams((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      const res = await signIn(authParams);

      const access_token = res.headers['access-token'];
      const client = res.headers['client'];
      const uid = res.headers['uid'];
      const id = res.data.data.id;

      if (res.status === 200) {
        console.log(res);
        if (typeof access_token === 'string')
          Cookies.set('_access_token', access_token);
        if (typeof client === 'string') Cookies.set('_client', client);
        if (typeof uid === 'string') Cookies.set('_uid', uid);
        Cookies.set('_id', id);

        authDispatch({ type: 'signin' });

        const user = await getCurrentUser();
        console.log(res?.data);
        authDispatch({
          type: 'setUser',
          payload: {
            user: user?.data.data,
            avatarUrl: user?.data.avatarUrl,
            mission: user?.data?.mission?.content,
            confirmed: false,
          },
        });
        navigate('/mypage');
      }
    } catch (err: any) {
      setAuthParams((prev) => ({ ...prev, password: '' }));
      if (err.response.status === 401) {
        setMessageState({
          message: err.response.data.errors[0],
          isOpen: true,
        });
      } else {
        setMessageState({
          message: 'internal server error 500',
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
        color="bg-red-500"
      />
      <AlertMessage
        messageState={emailMessageState}
        setMessageState={setEmailMessageState}
        color="bg-blue-500"
      />
      <div className="w-4/5 p-6 mx-auto bg-white text-gray-700 border border-gray-100 rounded-md shadow-xl  lg:max-w-2xl">
        <h1 className="mt-3 text-3xl font-semibold text-center uppercase">
          ログイン
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              メールアドレス
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={authParams.email}
              onChange={(e) => {
                handleChange(e);
              }}
              className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              パスワード
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={authParams.password}
              onChange={(e) => {
                handleChange(e);
              }}
              className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <p className="text-xs">
            パスワードを忘れた場合は
            <a href="passwordforget" className="text-blue-600 hover:underline">
              こちら
            </a>
          </p>
          <div className="mt-6 mx-auto w-1/3">
            <button
              onClick={(e) => handleSubmit(e)}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-600 rounded-lg hover:bg-blue-600 hover:opacity-90 focus:outline-none focus:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {' '}
          アカウトをお持ちでない場合{' '}
          <Link
            to="/signup"
            className="font-medium text-blue-500 hover:underline"
          >
            登録
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;

function dispatch(arg0: {
  type: string;
  payload: { user: User; avatarUrl: string; mission: string };
}) {
  throw new Error('Function not implemented.');
}
// コピペ https://larainfo.com/blogs/react-js-login-form-with-tailwind-css-example
// テストユーザー
// test@example.com&password'
