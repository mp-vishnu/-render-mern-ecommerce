import React from 'react';

const Cancel = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500">Payment Failed</h1>
        <p className="mt-4 text-lg">Please try again later.</p>
      </div>
    </div>
  );
};

export default Cancel;
