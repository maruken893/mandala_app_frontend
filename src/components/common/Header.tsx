import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAuthContext } from '../../context/AuthProvider';
import { signOut } from '../../lib/api/auth';

const Header = () => {
  const { state: auth, dispatch: authDispatch } = useAuthContext();
  const navigate = useNavigate();

  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      const res = await signOut();

      if (res.data.success === true) {
        Cookies.remove('_access_token');
        Cookies.remove('_client');
        Cookies.remove('_uid');
        Cookies.remove('_id');

        authDispatch({ type: 'signout' });
        navigate('/signin');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const AuthButtons = () => {
    if (auth.isSignedIn) {
      return (
        <li>
          <Link to="/test">
            <span className="text-sm">目標シート</span>
          </Link>
          <Link to="/mypage">
            <span className="ml-6 text-sm">マイページ</span>
          </Link>
          <button onClick={handleSignOut}>
            <span className="ml-6 text-sm">ログアウト</span>
          </button>
        </li>
      );
    } else {
      return (
        <>
          <li>
            <Link to={'/signup'}>
              <span className="text-sm">登録</span>
            </Link>
          </li>
          <li className="ml-6">
            <Link to={'/signin'}>
              <span className="text-sm">ログイン</span>
            </Link>
          </li>
        </>
      );
    }
  };

  return (
    <header className="bg-orange-400 text-slate-50">
      <div className="container flex mx-auto px-5 py-4 items-center">
        <div>
          <Link to="/">
            <span className="text-2xl font-bold">Mandala</span>
          </Link>
        </div>
        <nav className="ml-auto">
          <ul className="flex">
            <AuthButtons />
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
