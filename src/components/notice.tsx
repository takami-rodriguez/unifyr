import React, { PropsWithChildren } from "react";

const Notice: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-screen bg-slate-300">
      <div className="mx-auto size-fit px-4 py-2 text-center font-bold leading-[1.25] text-black">
        {children}
      </div>
    </div>
  );
};

export default Notice;
