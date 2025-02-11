import { fetchAllArticles } from "@/queries/resources";
import React from "react";
import { ResolvingMetadata, Metadata } from "next";
import { PageProps } from "@/types/page";
import LatestArticles from "../resources/components/latestArticles";
import { getDynamicPageSEOData } from "@/lib/seoHelper";
import { SEOData } from "@/types/seo";
import HeroFullBleedImage from "./components/aboutHero";
import { TeamMemberType } from "./components/leadership/leadershipGrid";
import LeadershipTeam from "./components/leadership";
import Timeline from "./components/timeline";

const metaData: SEOData = {
  fullTitle: "About | Unifyr",
  description:
    "Unifyr provides industry-leading supplier and partner management solutions for high-performance channel programs.",
};

export async function generateMetadata(
  {}: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return getDynamicPageSEOData(metaData, parent);
}

const teamMembers: TeamMemberType[] = [
  {
    image: {
      src: "/images/about/team/tobias.png",
      alt: "Tobias Hartmann",
    },
    name: "Tobias Hartmann",
    title: "Chief Executive Officer",
  },
  {
    image: {
      src: "/images/about/team/sayoung.png",
      alt: "Sayoung Jung",
    },
    name: "Sayoung Jung",
    title: "Head of Strategy & COO",
  },
  {
    image: {
      src: "/images/about/team/lionel.png",
      alt: "Lionel Farr",
    },
    name: "Lionel Farr",
    title: "Chief Technology Officer",
  },
  {
    image: {
      src: "/images/about/team/adrian.png",
      alt: "Adrian Muniz",
    },
    name: "Adrian Muniz",
    title: "Chief Financial Officer",
  },
  {
    image: {
      src: "/images/about/team/cosmo.png",
      alt: "Cosmo Mariano",
    },
    name: "Cosmo Mariano",
    title: "Chief Customer Officer",
  },
  {
    image: {
      src: "/images/about/team/laura.png",
      alt: "Laura Crawford",
    },
    name: "Laura Crawford",
    title: "Chief People Officer",
  },
];
 const timelineData = [
  {
    year: "2022",
    months: [
      {
        month: "Apr",
        colour: "bg-sky-200",
        content:
          "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus vivamus ante.",
      },
      {
        month: "Jun",
        colour: "bg-pink-300",
        content:
          "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus vivamus ante.",
      },
      {
        month: "Oct",
        colour: "bg-yellow-200",
        content:
          "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus vivamus ante.",
      },
      {
        month: "Nov",
        colour: "bg-emerald-200",
        content:
          "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus vivamus ante.",
      },
    ],
  },
  {
    year: "2023",
    months: [
      {
        month: "Mar",
        colour: "bg-sky-200",
        content:
          "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus vivamus ante.",
      },
      {
        month: "Jun",
        colour: "bg-violet-200",
        content:
          "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus vivamus ante.",
      },
      {
        month: "Jun",
        colour: "bg-emerald-200",
        content:
          "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus vivamus ante.",
      },
      {
        month: "Nov",
        colour: "bg-sky-200",
        content:
          "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus vivamus ante.",
      },
    ],
  },
  {
    year: "2024",
    months: [
      {
        month: "Jan",
        colour: "bg-yellow-200",
        content:
          "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus vivamus ante.",
      },
      {
        month: "Mar",
        colour: "bg-sky-200",
        content:
          "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus vivamus ante vel cursus mauris cursus vivamus ante.",
      },
      {
        month: "Jun",
        colour: "bg-pink-300",
        content:
          "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus cursus mauris cursus vivamus ante vel cursus mauris cursus vivamus ante.",
      },
      {
        month: "Nov",
        colour: "bg-violet-200",
        content:
          "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus vivamus ante.",
      },
    ],
  },
];

const AboutPage = async () => {
  const articles = await fetchAllArticles();
  return (
    <div className="mb-1 overflow-x-hidden">
      <HeroFullBleedImage
        block={{
          title: "About",
          image: {
            src: "/images/about/aboutHero.png",
            alt: "Unifyr | About us",
          },
        }}
      />
      <div className="my-20">
        <LeadershipTeam
          block={{ title: "", subTitle: "", members: teamMembers }}
        />
      </div>
      <Timeline
        block={{
          badge: "The past, present and future of Unifyr",
          years: timelineData,
        }}
      />
      {articles && <LatestArticles articles={articles} />}
    </div>
  );
};

export default AboutPage;
