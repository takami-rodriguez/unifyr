import Image from "next/image";
import React from "react";
import clsx from "clsx";
import { FaChevronRight } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export type TeamMemberType = {
  image: {
    src: string;
    alt: string;
  };
  bio: string;
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
        "grid grid-cols-1 justify-between gap-8 space-y-6 px-5 sm:gap-x-6 sm:space-x-0 sm:space-y-0 sm:px-11 md:grid-cols-2 lg:px-12 xl:grid-cols-3",
      )}
      style={{ gridAutoRows: "minmax(auto, max-content)" }}
    >
      {members.map((m) => (
        <div
          key={m.name + "leadershipKey"}
          className="z-100 group relative block overflow-hidden rounded-2xl"
        >
          <div className="z-100 relative h-full">
            <Dialog>
              <DialogTrigger className="w-full">
                {" "}
                <div className="flex h-full flex-col rounded-2xl bg-white p-2">
                  <AspectRatio ratio={3.6 / 4} className="relative">
                    <Image
                      src={m.image?.src}
                      alt={m.image?.alt || ""}
                      fill
                      className="rounded-xl object-cover"
                    />
                  </AspectRatio>
                  <div className="flex flex-grow flex-col justify-between px-4 lg:mx-0 lg:items-start lg:space-y-2">
                    <h4 className="pt-4 text-3xl text-[#061C49] lg:text-[2rem]">
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
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle>
                    <div className="grid items-center px-2 lg:grid-cols-2">
                      <div>
                        <h4 className="pt-4 text-3xl text-[#061C49] lg:text-[2rem]">
                          {m.name}
                        </h4>
                        <p className="flex font-bold leading-[30px] group-hover:underline lg:pb-5 lg:pt-3">
                          {m.title}
                        </p>
                      </div>
                    </div>
                  </DialogTitle>
                  <DialogDescription>
                    <p>{m.bio}</p>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeadershipGrid;
