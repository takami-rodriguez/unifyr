import { AuthorDetails } from "@/types/article";
import clsx from "clsx";
import React from "react";
import Image from "next/image";

type AuthorType = {
  author: AuthorDetails;
};
const Author = ({ author }: AuthorType) => {
  return (
    <div>
      <div
        className={clsx("flex space-x-6 sm:items-center ", {
          " text-center mx-auto": !author?.image?.url,
        })}
      >
        {author?.image?.url && (
          <Image
            src={author.image?.url}
            alt={author.name}
            width={50}
            height={50}
            className="rounded-full"
          />
        )}
        <div
          className={clsx("lg:mx-auto lg:text-left  sm:max-w-none  ", {
            "max-w-40": author?.image?.url,
          })}
        >
          <h4 className="text-3.5xl font-normal ">{author?.name}</h4>
        </div>
      </div>
    </div>
  );
};

export default Author;
