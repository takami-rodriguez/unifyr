import React from "react";
const ArticleVideo = ({ video }: { video: string }) => {
  return (
    <div className="m-3 grid py-6 sm:m-4 md:px-0 lg:px-[115px]">
      <div className="col-span-12 h-full">
        <div className="relative h-full object-cover">
          <span className="block object-cover"></span>
          <iframe
            src={video}
            className="mx-auto aspect-video w-full self-stretch"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
};

export default ArticleVideo;
