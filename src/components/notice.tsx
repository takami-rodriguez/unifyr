import React, { PropsWithChildren } from "react";

const Notice: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-screen bg-green-700">
      <div className="mx-auto size-fit px-4 py-2 text-center leading-[1.25] text-white">
        {children}
      </div>
    </div>
  );
};

export default Notice;
