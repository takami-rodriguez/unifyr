import Image from "next/image";
import React from "react";
import clsx from "clsx";
import { FaChevronRight } from "react-icons/fa";

export type TeamMemberType = {
  image: {
    src: string;
    alt: string;
  };
  name: string;
  title: string;
};

const LeadershipGrid = ({
  members,
}: {
  members: TeamMemberType[];
}): JSX.Element => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 justify-between space-y-6 px-5 sm:gap-x-6 sm:space-x-0 sm:space-y-0 sm:px-11 md:grid-cols-2 lg:px-12 xl:grid-cols-3 gap-8",
      )}
      style={{ gridAutoRows: "minmax(auto, max-content)" }}
    >
      {members.map((m) => (
        <div
          key={m.name + "leadershipKey"}
          className="z-100 group relative block overflow-hidden rounded-2xl"
        >
          <div className="z-100 relative h-full">
            <div className="flex h-full flex-col rounded-2xl bg-white p-2">
              <div className="md relative h-[350px] w-full lg:h-[300px] xl:h-[400px]">
                <Image
                  src={m.image?.src || ""}
                  alt={m.image?.alt || ""}
                  fill
                  className="rounded-xl object-cover"
                />
              </div>
              <div className="flex flex-grow flex-col justify-between px-4 lg:mx-0 lg:items-start lg:space-y-2">
                <h4 className="text-3xl lg:text-[2rem] pt-4 text-[#061C49]">
                  {m.name}
                </h4>
                <div className="flex w-full items-center justify-end space-x-2 pb-2 pt-5 lg:pb-0">
                  <p className="flex font-bold leading-[30px] group-hover:underline lg:pb-5 lg:pt-3">
                    {m.title}
                  </p>
                  <FaChevronRight className="mb-1 h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeadershipGrid;
