import { ButtonTypeProps } from "@/app/platform/components/platformHero/buttons";
import { ImageTextProps } from "@/components/imageText";
import { ButtonVariant } from "@/components/ui/button";
import { NavLink } from "@/data/navLinks";
import { ReactNode } from "react";

export type PlatformHeroBlock = {
  title: string;
  titleHighlight: string;
  description: string;
  image: string;
  button1: ButtonTypeProps;
  button2: ButtonTypeProps;
};

export type PlatformImageSectionBlock = {
  title: string;
  description: string;
  imageUrl: string;
  wistiaId: string;
  features: IntroFeatureItem[];
};

export type PlatformWithWistiaId = {
  title: string;
  description: string;
  wistiaVideoId: string;
  features: IntroFeatureItem[];
};

export type IntroFeatureItem = {
  icon: ReactNode;
  title: string;
  description: string;
};

export type PlatformJourneyBlock = {
  title: string;
  intro: string;
  image: string;
  features: {
    title: string;
    description: string;
  }[];
};


export type FeatureItem = {
  icon:  string;
  title: string;
  description: string;
};

export type PlatformFeaturesBlock = {
  title: string;
  description: string;
  features: FeatureItem[];
};

export type PlatformAccordionBlock = {
  items: {
    trigger: string;
    content: string;
  }[];
  cta: {
    title: string;
    content: string;
    button: {
      label: string;
      variant: ButtonVariant;
      link: NavLink;
    };
  };
};
export interface PlatformTemplateProps {
  hero: PlatformHeroBlock;
  introSection: PlatformImageSectionBlock | PlatformWithWistiaId;
  imagesTexts: ImageTextProps[];
  journey: PlatformJourneyBlock;
  features: PlatformFeaturesBlock;
  platformAccordion: PlatformAccordionBlock;
}
