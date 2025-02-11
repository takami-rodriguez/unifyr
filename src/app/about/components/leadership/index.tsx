"use client";
import React from "react";

import LeadershipGrid, { TeamMemberType } from "./leadershipGrid";
import { bgGradient } from "@/data/styleHelpers";

type LeadershipTeamProps = {
  block: {
    title: string;
    subTitle: string;
    members: TeamMemberType[]
  };
};

const LeadershipTeam = ({ block }: LeadershipTeamProps): JSX.Element => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="rounded-2xl pb-10 pt-10 sm:pb-20 sm:pt-14" style={bgGradient}>
        <div className="space-y-6 text-center sm:space-y-10">
          <div className="space-y-2 sm:space-y-6">
            <h3 className="text-5xl text-blue-900 md:text-6xl">{block.title}</h3>
            {block.subTitle && (
              <div className="mx-auto max-w-64 font-medium sm:max-w-none">
                {block.subTitle}
              </div>
            )}
          </div>
        </div>
        <div className="">
          <LeadershipGrid members={block.members} />
        </div>
      </div>
    </div>
  );
};

export default LeadershipTeam;
