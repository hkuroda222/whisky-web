import React from 'react';

export const Wrap: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <div className="flex justify-center min-h-[calc(100vh_-_88px)] pt-8 pb-20 px-3">
      <div className="p-3 md:p-8 w-full lg:w-3/5 bg-white rounded">
        {props.children}
      </div>
    </div>
  );
};
