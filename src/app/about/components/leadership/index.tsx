"use client";
import React from "react";

import { bgGradient } from "@/data/styleHelpers";
import LeadershipGrid, { TeamMemberType } from "./leadershipGrid";

type LeadershipTeamProps = {
  block: {
    title: string;
    members: TeamMemberType[]
  };
};

const LeadershipTeam = ({ block }: LeadershipTeamProps): JSX.Element => {
  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="rounded-2xl pb-10 pt-10 sm:pb-20 sm:pt-16" style={bgGradient}>
        <div className="max-w-5xl mx-auto">
          <h3 className="font-semibold text-4xl md:text-5xl text-center pb-12 md:leading-7 leading-10">{block.title}</h3>
          <LeadershipGrid members={block.members} />
        </div>
      </div>
    </div>
  );
};

export default LeadershipTeam;
