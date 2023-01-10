import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//
import { useAuthContext } from './context/AuthProvider';
import { useLoadContext } from './context/LoadProvider';
import { getCurrentUser } from './lib/api/auth';

// components
import Home from './components/pages/Home';
import SignUp from './components/pages/SignUp';
import SignIn from './components/pages/SignIn';
import CommonLayout from './components/layout/Layout';
import Top from './components/mandala_chart/MandalaChart';
import Profile from './components/common/Profile';
import { createMission } from './lib/api/mandala';
import MandalaPage from './components/pages/MandalaPage';

function App() {
  const { isLoading, setIsLoading } = useLoadContext();
  const { state: auth, dispatch } = useAuthContext();

  const handleGetCurrentUser = async () => {
    try {
      setIsLoading(true);
      const res = await getCurrentUser();
      console.log(res?.data);
      if (res?.data.isLogin === true) {
        dispatch({ type: 'signin' });
        dispatch({
          type: 'setUser',
          payload: {
            user: res?.data.data,
            avatarUrl: res?.data.avatarUrl,
            mission: res?.data?.mission?.content,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, []);

  return (
    <CommonLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="test" element={<MandalaPage />} />
        <Route path="mypage" element={<Profile />} />
      </Routes>
    </CommonLayout>
  );
}

export default App;
