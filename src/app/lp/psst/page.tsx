"use client";
import React from "react";

import Video from "@/components/landing/sections/video";
import Comparison from "@/components/landing/sections/comparison";
import HeadingText from "@/components/landing/sections/headingText";
import Partners from "@/components/landing/sections/partners";
import Psst from "@/components/landing/sections/psst";
import Card, { GradientType } from "@/components/ui/card";

const G2Page = () => {
  return (
    <div className="mx-auto max-w-7xl">
      <Psst />

      <Video wistiaVideoId="6yip3slsj5"></Video>

      <Partners
        title="Trusted by the world's brightest companies"
        className="mb-20 mt-20"
      />

      <Comparison
        title="We get compared to Impartner, a lot."
        description="Maybe it’s because we get listed on the same analyst and G2 grids. Whatever it is, channel leaders think they’re comparing apples to apples. But it’s really like comparing apples to oranges."
      >
        <HeadingText centered header="So what’s the difference?">
          Impartner’s channel management tools are robust and help organizations
          manage deal registration and lead distribution efficiently. But that’s
          not the whole picture. Impartner excels in some areas, but it’s
          designed primarily for basic channel management functions. ZiftONE
          gives businesses a comprehensive suite of tools for marketing
          automation, advanced analytics, partner engagement, and more.
        </HeadingText>
        <Comparison.Table left="Impartner" right="Unifyr">
          <Comparison.Table.Row feature="Channel Management">
            <ul>
              <li>Strong channel management</li>
              <li>May require integration with other tools</li>
              <li>More complex interface</li>
            </ul>
            <ul>
              <li>Fully integrated platform User-friendly interface</li>
              <li>User-friendly interface</li>
            </ul>
          </Comparison.Table.Row>
          <Comparison.Table.Row feature="Sales and Marketing Enablement">
            <ul>
              <li>Good content management</li>
              <li>Marketing automation features less extensive</li>
            </ul>
            <ul>
              <li>Robust content syndication</li>
              <li>Advanced automated marketing campaigns</li>
            </ul>
          </Comparison.Table.Row>
        </Comparison.Table>
      </Comparison>

      {/* <Features
        className="py-20"
        title="Privacy-first generative AI"
        description="ZiftONE’s extensive AI features use Unifyr-owned models—your data is never shared with any third parties."
      >
        <Features.Feature
          title="Firmographic notes"
          description="View a complete firmographic profile of accounts in ZiftONE."
          icon="/images/platform/ziftONE/icons/Firmographic-notes.svg"
        />
        <Features.Feature
          title="Deal & lead prediction"
          description="Assess likelihood to buy and close deals with confidence."
          icon="/images/platform/ziftONE/icons/Deal-lead-prediction.svg"
        />
        <Features.Feature
          title="Partner segmentation"
          description="Segment your audience quickly using natural language."
          icon="/images/platform/ziftONE/icons/Partner-segmentation.svg"
        />
        <Features.Feature
          title="Email assistance"
          description="Produce on-brand, partner-ready email content quickly."
          icon="/images/platform/ziftONE/icons/Email-assistance.svg"
        />
        <Features.Feature
          title="Pop-up notifications"
          description="Notify partners of new campaigns and company updates."
          icon="/images/platform/ziftONE/icons/Pop-up-notifications.svg"
        />
        <Features.Feature
          title="Social post assistance"
          description="Write effective posts optimized for any social media channel."
          icon="/images/platform/ziftONE/icons/Social-post-assistance.svg"
        />
      </Features> */}

      {/* <Dark
        title="Feeling like just another number with your current provider?"
        description="We provide you with the building blocks to bring your channel vision to life with immersive experiences — fast and without issues."
      >
        <Dark.Stats>
          <Dark.Stats.Stat percent={20} title="Increase in dealer sales" />
          <Dark.Stats.Stat
            percent={28}
            title="Increase in partner deal registration"
          />
          <Dark.Stats.Stat
            percent={47}
            title="Increase in partner engagement"
          />
          <Dark.Stats.Stat
            percent={53}
            title="Increase in partner retention rates"
          />
        </Dark.Stats>
      </Dark> */}

      <div className="mt-16 flex md:flex-row flex-col items-start gap-8">
        <Card.Rainbow
          className="flex-1"
          innerClassName="flex flex-col gap-4"
          type={GradientType.Red}
        >
          <h3 className="text-2xl font-semibold">What our competitors do?</h3>
          <p>
            Their PRM platform helps organizations streamline their channel
            management processes, ensuring efficient deal registration and lead
            distribution.
          </p>
          <p>
            It offers tools to manage partner onboarding, automate workflows,
            and provide basic analytics to track channel performance. Their
            focus is on operational efficiency within the channel, providing
            necessary tools to keep things running smoothly.
          </p>
        </Card.Rainbow>
        <Card.Rainbow
          className="flex-1"
          innerClassName="flex flex-col gap-4"
          type={GradientType.Purple}
        >
          <h3 className="text-2xl font-semibold">What ZiftONE does?</h3>
          <p>
            ZiftONE’s comprehensive platform helps businesses maximize their
            channel potential by providing a full suite of integrated tools for
            marketing, sales, and partner management.
          </p>
          <p>
            From advanced content syndication and automated marketing campaigns
            to in-depth analytics and customizable partner portals, ZiftONE does
            it all. This means more effective marketing, deeper insights into
            partner performance, and better engagement and retention of your
            partner network. With ZiftONE, you spend less time managing tools
            and more time driving strategic growth and revenue.
          </p>
        </Card.Rainbow>
      </div>
    </div>
  );
};

export default G2Page;
