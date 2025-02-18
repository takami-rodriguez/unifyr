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
  bio: string[];
  name: string;
  title: string;
};

const LeadershipGrid = ({
  members,
}: {
  members: TeamMemberType[];
}): JSX.Element => {
  return (
    <div className="grid grid-cols-1 gap-8 px-5 sm:px-11 lg:px-12 lg:grid-cols-4">
      {members.map((m, index) => (
        <div
          key={m.name + "leadershipKey"}
          className={clsx(
            "z-100 group relative block overflow-hidden rounded-2xl w-full",
            index >= 4 && "lg:col-span-1 lg:justify-self-center"
          )}
        >
          <div className="z-100 relative h-full">
            <Dialog>
              <DialogTrigger className="w-full">
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
                    <h4 className="pt-4 text-3xl text-[#061C49] lg:text-[1.5rem]">
                      {m.name}
                    </h4>
                    <div className="flex w-full items-center justify-end space-x-2 pb-2 pt-5 lg:pb-0 text-sm">
                      <p className="flex font-bold leading-[30px] group-hover:underline lg:pb-5 lg:pt-3">
                        {m.title}
                      </p>
                      <FaChevronRight className="mb-1.5 h-3 w-3" />
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent
                className="bg-white"
                style={{
                  borderRadius: "8px",
                  background:
                    "linear-gradient(105deg, rgba(215, 14, 134, 0.07) 12.54%, rgba(36, 56, 139, 0.09) 97.75%), #FFF",
                }}
              >
                <DialogHeader></DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription>
                  <div className="grid items-start gap-10 pl-8 pr-10 sm:grid-cols-6 pb-8">
                    <div className="sm:col-span-4">
                      <h4 className="pt-4 text-3xl font-normal text-grey-900 lg:text-[2.75rem]">
                        {m.name}
                      </h4>
                      <p className="flex font-bold leading-[30px] text-grey-900/70 lg:pb-5 lg:pt-3">
                        {m.title}
                      </p>
                      <div className="space-y-6">
                        {m.bio.map((b, i) => (
                          <p key={i} className="text-lg text-grey-900/70">
                            {b}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <AspectRatio
                        ratio={3.6 / 4}
                        className="relative order-first lg:order-last"
                      >
                        <Image
                          src={m.image?.src}
                          alt={m.image?.alt || ""}
                          fill
                          className="rounded-xl object-cover"
                        />
                      </AspectRatio>
                    </div>
                  </div>
                </DialogDescription>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeadershipGrid;