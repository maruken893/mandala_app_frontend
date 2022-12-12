import React from 'react';
import Footer from '../common/Footer';
import Header from '../common/Header';

const CommonLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Header />
      <div className="mb-auto">{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
