import React from "react";
import Winter from "./winter";
import Spring from "./spring";
import Summer from "./summer";
import Fall from "./fall";

const G2Leaders = () => {
  return (
    <div className="flex space-x-5 justify-center">
      <div className="w-[88px]">
        <Winter />
      </div>
      <div className="w-[88px]">
        <Spring />
      </div>
      <div className="w-[88px]">
        <Summer />
      </div>
      <div className="w-[88px]">
        <Fall />
      </div>
    </div>
  );
};

export default G2Leaders;
