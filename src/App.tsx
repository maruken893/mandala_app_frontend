import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//
import { useAuthContext } from './context/AuthProvider';
import { useLoadContext } from './context/LoadProvider';
import { getCurrentUser } from './lib/api/auth';

// components
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import CommonLayout from './components/layout/CommonLayout';
import Top from './components/mandala_chart/Top';

function App() {
  const { isLoading, setIsLoading } = useLoadContext();
  const { state: auth, dispatch } = useAuthContext();

  const handleGetCurrentUser = async () => {
    try {
      setIsLoading(true);
      const res = await getCurrentUser();
      // console.log(res);
      if (res?.data.isLogin === true) {
        dispatch({ type: 'signin' });
        dispatch({ type: 'setUser', payload: { user: res?.data.data } });
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
        <Route path="test" element={<Top />} />
        {/* <Route path="mandala" element={<Top />} /> */}
      </Routes>
    </CommonLayout>
  );
}

export default App;
