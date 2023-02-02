import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

const LoadingSpinner: React.FC<{}> = () => {
  return (
    <div className="flex justify-center">
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="40"
        visible={true}
      />
    </div>
  );
};

export default LoadingSpinner;
