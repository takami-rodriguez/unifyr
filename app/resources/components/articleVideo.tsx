import React from "react";
const ArticleVideo = ({ video }: { video: string }) => {
  return (
    <div className=" m-3 grid sm:m-4 md:px-0  lg:px-[115px] py-6">
      <div className="col-span-12 h-full">
        <div className="relative h-full object-cover">
          <span className="block object-cover "></span>
          <iframe
            src={video}
            className="w-full aspect-video self-stretch mx-auto "
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
};

export default ArticleVideo;
