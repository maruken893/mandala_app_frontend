import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Jumbotron from '../common/Jumbotron';
import { useAuthContext } from '../../context/AuthProvider';
import { useLoadContext } from '../../context/LoadProvider';

import { getCurrentUser } from '../../lib/api/auth';
import MandalaPage from './MandalaPage';

const Home = () => {
  const { state: auth } = useAuthContext();
  const { isLoading } = useLoadContext();
  const navigate = useNavigate();

  return (
    <>
      {auth.isSignedIn ? (
        <MandalaPage />
      ) : (
        <>
          <div className="py-20 bg-zinc-100 text-zinc-600 border-b border-t-0 borer-x-0 border-zinc-400 flex flex-col items-center md:py-40">
            <h2 className="mb-2 text-center text-5xl font-semibold">Mandala</h2>
            <h3 className="text-center tracking-wide text-xl mb-6 font-medium italic">
              Mandalaは目標を達成する助けになります
            </h3>
            <p className="px-6 text-zinc-500 font-light tracking-wide text-center max-w-2xl">
              9×9マスのマンダラチャートと呼ばれる表に、実現させたい目標に必要な要素を自分自身で考え整理することで、目標までに行うべきことを明確にすることができます。
            </p>
            <div className="space-x-3 mt-6">
              {/* <Link to="/about">
              <button
                type="button"
                className="px-8 py-3 bg-blue-500 text-white font-medium text-md leading-tight uppercase rounded shadow-md hover:bg-blue-600 hover:shadow-lg focus:bg-blue-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                詳しく知る
              </button>
            </Link> */}
              <Link to="/signup">
                <button
                  type="button"
                  className="py-3 px-5 bg-green-500 text-white font-medium text-md leading-tight rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  Mandalaに登録する
                </button>
              </Link>
            </div>
          </div>
          <div className="py-16 text-center bg-white text-zinc-600">
            <h2 className="text-3xl mb-8 font-semibold">Mandalaの特徴</h2>
            <div className="flex flex-wrap justify-around w-3/4 mx-auto">
              <div className="w-90 h-120 rounded overflow-hidden shadow-lg">
                <img
                  className="w-11/12 mx-auto mt-3"
                  src="feature1.png"
                  alt="Sunset in the mountains"
                />
                <div className="mt-2 px-6 py-3 border-t-2 border-orange-300">
                  <div className="font-bold text-lg mb-1">マンダラチャート</div>
                  <p className="text-gray-700 text-sm">
                    目標に応じて自由に作れる！
                  </p>
                </div>
              </div>
              <div className="w-90 h-120 rounded overflow-hidden shadow-lg">
                <img
                  className="w-11/12 mx-auto mt-3"
                  src="feature2.png"
                  alt="Sunset in the mountains"
                />
                <div className="mt-2 px-6 py-3 border-t-2 border-orange-300">
                  <div className="font-bold text-lg mb-1">ユーザーポスト</div>
                  <p className="text-gray-700 text-sm">
                    目標に向けて行動したことを投稿できる！
                  </p>
                </div>
              </div>
              <div className="w-90 h-120 rounded overflow-hidden shadow-lg">
                <img
                  className="w-11/12 mx-auto mt-3"
                  src="feature3.png"
                  alt="Sunset in the mountains"
                />
                <div className="mt-32 px-6 py-3 border-t-2 border-orange-300">
                  <div className="font-bold text-lg mb-1">
                    ライバル機能(実装予定)
                  </div>
                  <p className="text-gray-700 text-sm">
                    他のユーザをライバルとし、お互いを高め合いながら目標を達成しよう！
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
