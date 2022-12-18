import React from 'react';
import PostFeed from '../common/PostFeed';
import PostInput from '../common/PostInput';
import MandalaChart from '../mandala_chart/MandalaChart';

const MandalaPage = () => {
  return (
    <div className="border border-red-700 flex">
      <MandalaChart />
      <div className="mt-10 hidden md:h-5/6 md:block md:w-1/3 lg:w-5/12 lg:mx-auto">
        <PostInput />
        <PostFeed />
      </div>
    </div>
  );
};

export default MandalaPage;
