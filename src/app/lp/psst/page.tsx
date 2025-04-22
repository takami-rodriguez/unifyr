"use client";
import React from "react";

import Comparison from "@/components/landing/sections/comparison";
import HeadingText from "@/components/landing/sections/headingText";
import Partners from "@/components/landing/sections/partners";
import Psst from "@/components/landing/sections/psst";
import Callout from "@/components/landing/sections/callout";
import Video from "@/components/landing/sections/video";
import ImageText from "@/components/landing/sections/imageText";
import Accordion from "@/components/landing/sections/accordion";

const G2Page = () => {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-12 pt-8">
      <Psst />
      <Video wistiaVideoId="zhjsfv098n" />
      <Partners title="Trusted by the world's brightest companies" />
      <Comparison.TwoImages
        imageA="/images/lp/apple.png"
        imageB="/images/lp/orange.png"
      >
        <HeadingText header="We get compared to Impartner, a lot.">
          Maybe it’s because we get listed on the same analyst and G2 grids.
          Whatever it is, channel leaders think they’re comparing apples to
          apples. But it’s really like comparing apples to oranges.
        </HeadingText>
      </Comparison.TwoImages>
      <HeadingText centerHeader header="So what’s the difference?">
        Impartner’s channel management tools are robust and help organizations
        manage deal registration and lead distribution efficiently. But that’s
        not the whole picture. Impartner excels in some areas, but it’s designed
        primarily for basic channel management functions. ZiftONE gives
        businesses a comprehensive suite of tools for marketing automation,
        advanced analytics, partner engagement, and more.
      </HeadingText>
      <Comparison.Table left="Competitors" right="ZiftONE">
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
      <Comparison.TwoSide>
        <>
          <h3 className="text-2xl font-semibold">
            What do our competitors do?
          </h3>
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
        </>
        <>
          <h3 className="text-2xl font-semibold">What does ZiftONE do?</h3>
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
        </>
      </Comparison.TwoSide>
      <Callout>
        <h2>
          Need a <span className="u-gradient-text">cost-effective</span>{" "}
          solution without compromising quality?
        </h2>
        <button className="rounded-lg border border-black bg-white px-8 py-4 font-sans text-lg font-bold">
          Let&apos;s chat
        </button>
      </Callout>
      <div className="overflow-hidden">
        <ImageText
          badge="Plan"
          title="Build channel partnerships worth investing in"
          image="/images/home/left-right/plan.webp"
          content="Shape your supplier-partner relationships into enduring strategic alliances. Through a robust partner program, you establish the foundation for sustained channel success and measurable value."
        />
        <ImageText
          badge="Grow"
          imageLeft
          title="Accelerate growth through mutual commitment"
          image="/images/home/left-right/grow.webp"
          content="Growth happens naturally when partners and suppliers invest fully in each other's success. Unifyr strengthens this commitment by making co-selling effortless, turning strong relationships into recurring results."
        />
        <ImageText
          badge="Unite"
          title="Unite channel relationships under one strategic vision"
          image="/images/home/left-right/unite.webp"
          content="Strategically align your channel ecosystem. Unifyr makes it easy to coordinate partnerships for both suppliers and partners, turning relationships into a unified force for growth."
        />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-16 lg:flex-row">
        <Accordion className="w-full">
          <Accordion.Section title="Unify your something or something">
            We&apos;ve carefully considered how suppliers share resources with
            their partners. In the ZiftONE content management system, opt in to
            funnel critical updates and content to partners through Unifyr+.
            Turn on the partner AI adviser to have it analyze and index content
            that ensures it reaches partners at the moments when it matters
            most, saving you time and promoting partner performance.
          </Accordion.Section>
          <Accordion.Section title="Use channel intelligence to make decisions">
            ZiftONE reveals the patterns that drive channel success. Detailed
            reporting turns granular partner activities into holistic views that
            reveal channel performance. The depth of visibility enables you to
            make decisions based on partner outcomes.
          </Accordion.Section>

          <Accordion.Section title="Prepare your program to scale">
            ZiftONE is designed for businesses with partner programs of all
            sizes and will continue to serve you as your program evolves and
            your business grows. Our dedicated Labs Team is here to help build
            the next stage of your digital partner ecosystem when you reach
            crucial growth milestones.
          </Accordion.Section>
        </Accordion>

        <div className="w-full space-y-8 text-xl">
          <h3 className="font-semibold uppercase tracking-wider text-slate-500">
            Have questions?
          </h3>
          <p>
            Startup framework includes great form options for your startup
            projects
          </p>
          <button className="rounded-xl bg-indigo-900 px-12 py-3 text-lg text-white">
            Let&apos;s chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default G2Page;
