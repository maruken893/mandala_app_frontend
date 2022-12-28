import React from 'react';
import PostFeed from '../post/PostFeed';
import PostInput from '../post/PostInput';
import MandalaChart from '../mandala_chart/MandalaChart';

const MandalaPage = () => {
  return (
    <div className="border border-red-700 flex">
      <MandalaChart />
      <div className="mt-10 hidden md:block md:w-1/3 lg:w-5/12 lg:mx-auto">
        <PostInput />
        <PostFeed />
      </div>
    </div>
  );
};

export default MandalaPage;
