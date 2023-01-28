import { Routes, Route } from 'react-router-dom';

// components
import Home from '../pages/Home';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import Top from '../mandala_chart/MandalaChart';
import Profile from '../pages/Profile';

// 一旦仮実装した 参考:https://zenn.dev/longbridge/articles/61b05d8bdb014d
// import RouteAuthGuard from './RouteAuthGuard';

const RouteConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="test" element={<Top />} />
      <Route path="mypage" element={<Profile />} />
    </Routes>
  );
};

export default RouteConfig;
