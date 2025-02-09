import { AuthorDetails } from "@/types/article";
import clsx from "clsx";
import React from "react";
import Image from "next/image";

type AuthorType = {
  author: AuthorDetails;
  size?: number;
};
const Author = ({ author, size }: AuthorType) => {
  return (
    <div
      className={clsx("flex space-x-4 sm:items-center", {
        "mx-auto text-center": !author?.image?.url,
      })}
    >
      {author?.image?.url && (
        <Image
          src={author.image?.url || ""}
          alt={author.name}
          width={size || 50}
          height={size || 50}
          className="rounded-sm"
        />
      )}
      <div
        className={clsx("sm:max-w-none lg:mx-auto lg:text-left", {
          "max-w-40": author?.image?.url,
        })}
      >
        <h4 className="font-medium text-grey-800">{author?.name}</h4>
      </div>
    </div>
  );
};

export default Author;
