import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthProvider';

// FIXME: anyを使ってる
const Profile: React.FC<{ user?: any; mission?: string }> = ({
  user,
  mission,
}) => {
  const { state: auth } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user === false && !!auth.currentUser === false) {
      navigate('/signin');
    }
  }, []);

  return (
    <>
      <div className="relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-24">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full flex justify-center">
              <div className="relative">
                <img
                  src="https://github.com/creativetimofficial/soft-ui-dashboard-tailwind/blob/main/build/assets/img/team-2.jpg?raw=true"
                  className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                />
              </div>
            </div>
            <div className="text-center">
              <h3 className="mt-24 text-2xl text-slate-700 font-bold leading-normal mb-1">
                {user?.name || auth.currentUser?.name}
              </h3>
              <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
                Paris, France
              </div>
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
                <div className="mb-3">
                  <h2 className="text-lg font-bold">目標</h2>
                  <h2>{user?.mission || auth.mission}</h2>
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
