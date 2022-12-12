import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Jumbotron from '../components/common/Jumbotron';
import { useAuthContext } from '../context/AuthProvider';
import { useLoadContext } from '../context/LoadProvider';

import { getCurrentUser } from '../lib/api/auth';

const Home = () => {
  const { state: auth } = useAuthContext();
  const { isLoading } = useLoadContext();
  const navigate = useNavigate();

  const handleClick = async () => {
    const user = await getCurrentUser();
    console.log(user);
  };

  return (
    <>
      {auth.isSignedIn ? (
        <div className="mx-auto container">
          <h1>Auth Demoのホームです</h1>
          <h2>Email: {auth.currentUser?.email}</h2>
          <h2>Name: {auth.currentUser?.name}</h2>
          <button onClick={handleClick}>get current_user</button>
        </div>
      ) : (
        <div className="w-4/5 my-20 py-10 m-auto bg-gray-200 text-gray-700  rounded-md shadow-xl flex flex-col items-center md:max-w-2xl ">
          <h2 className="text-center font-semibold text-2xl md:text-3xl mb-5">
            Auth Demoへよこうそ！
          </h2>
          <p className="text-center text-xs sm:text-base">
            Auth Demoはdevise_token_authとReactの <br />{' '}
            練習用に作ったサイトです。
          </p>
          <div className="space-x-6">
            <Link to="/signup">
              <button
                type="button"
                className="inline-block px-8 py-3 mt-6 bg-green-500 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                登録する
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
