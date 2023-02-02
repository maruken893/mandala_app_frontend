import React, { useState } from 'react';
import { forgetPassword } from '../../lib/api/user';
import AlertMessage from '../common/AlertMessagee';
import LoadingSpinner from '../common/LoadingSpinner';

const redirectUrl = import.meta.env.VITE_PASSWORD_FORGET_REDIRECT_URL;

const PasswornForget = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ message: '', isOpen: false });
  const [emailSendMessage, setEmailSendMessage] = useState({
    message: '',
    isOpen: false,
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await forgetPassword({
        email,
        redirectUrl,
      });
      setEmailSendMessage({
        message: '入力されたメールアドレスにメールを送りました。',
        isOpen: true,
      });
    } catch (err) {
      setError({ message: 'emailが見つかりませんでした', isOpen: true });
    }
    setEmail('');
    setIsLoading(false);
  };

  return (
    <div className="mt-8 w-4/5 p-6 mx-auto bg-white text-gray-700 border border-gray-100 rounded-md shadow-xl  lg:max-w-2xl">
      <AlertMessage
        messageState={error}
        setMessageState={setError}
        color="bg-red-500"
      />
      <AlertMessage
        messageState={emailSendMessage}
        setMessageState={setEmailSendMessage}
        color="bg-blue-500"
      />
      <h1 className="mt-3 text-2xl font-semibold text-center uppercase">
        パスワードを忘れた
      </h1>
      <form onSubmit={onSubmit}>
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
        />
        <div className="mt-6 mx-auto w-1/3">
          {!isLoading ? (
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-600 rounded-lg hover:bg-blue-600 hover:opacity-90 focus:outline-none focus:bg-blue-600">
              メールを送る
            </button>
          ) : (
            <LoadingSpinner />
          )}
        </div>
      </form>
    </div>
  );
};

export default PasswornForget;
