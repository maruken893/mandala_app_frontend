import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthProvider';
import { User } from '../../interfaces/auth';

const Profile: React.FC = () => {
  const { state: auth } = useAuthContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (!auth.isSignedIn) {
      navigate('/signin');
    }
    if (!id) {
      // ユーザーをフェッチする
    } else {
      setUser(auth.currentUser);
    }
  }, []);

  return (
    <>
      <div className="relative max-w-md mx-auto md:max-w-2xl min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-24">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full flex justify-center">
              <div className="relative">
                <Link to="avatar">
                  {!!auth.avatarUrl ? (
                    <img
                      src={auth.avatarUrl}
                      className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-18 max-w-[150px] max-h-[150px]"
                    />
                  ) : (
                    <img
                      src="default-avatar.png"
                      className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-18 max-w-[150px] max-h-[150px]"
                    />
                  )}
                </Link>
                {/* <Link to=>アバター画像を変更する</Link> */}
              </div>
            </div>

            <div className="text-center">
              <h3 className="mt-24 text-2xl text-slate-700 font-bold leading-normal mb-1">
                {auth.currentUser?.name}
              </h3>
              {/* <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
                Paris, France
              </div> */}
            </div>
            {/* <div className="w-full text-center">
              <div className="flex justify-center pb-0">
                <div className="p-2 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                    2,454
                  </span>
                  <span className="text-sm text-slate-400">Followers</span>
                </div>

                <div className="p-2 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                    564
                  </span>
                  <span className="text-sm text-slate-400">Following</span>
                </div>
              </div>
            </div> */}
          </div>
          <div className="text-center">
            {!auth.currentUser && (
              <button className="text-slate-50 bg-orange-400 py-3 px-7 mt-3 rounded-lg">
                Follow Account
              </button>
            )}
          </div>
          <div className="mt-6 py-6 border-t border-slate-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4">
                <div className="mb-5">
                  <h2 className="text-lg font-bold">目標</h2>
                  <h2>{auth?.mission ? auth.mission : '目標が未設定です'}</h2>
                </div>
                <div>
                  <h3>Biography</h3>
                  <p className="font-light leading-relaxed text-slate-600 mb-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatum possimus odit beatae atque est saepe dolore,
                    nobis, eos odio ab excepturi exercitationem eum ipsum
                    incidunt quidem? Cum doloremque rem reiciendis!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

// 参照　https://tailwindcomponents.com/component/user-profile-card-4
