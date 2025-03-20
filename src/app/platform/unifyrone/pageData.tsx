import BizOrgIcon from "@/components/icons/platform/bizorg";
import GenerativeAIIcon from "@/components/icons/platform/generativeAI";
import TCMAIcon from "@/components/icons/platform/tcma";
import { ButtonVariant } from "@/components/ui/button";
import { NavLink } from "@/data/navLinks";
import { PlatformTemplateProps } from "@/types/platformTemplate";

export default {
  hero: {
    title: "The only enterprise-class PRM for small businesses",
    titleHighlight: "small",
    description:
      "For businesses with a youthful partner program, UnifyrONE is the only PRM built to reach ROI quickly and scale.",
    image: "/images/platform/unifyrone/hero.webp",
    button1: {
      label: "Book a call",
      variant: "unifyrOne" as ButtonVariant,
      link: NavLink.BookACall,
    },
    button2: {
      label: "Blog",
      variant: "outline" as ButtonVariant,
      link: NavLink.Blog,
    },
  },
  introSection: {
    title: "Streamline partner enablement",
    description: "UnifyrONE makes it easy to launch a new partner program",
    imageUrl: "/images/platform/unifyrone/streamline.webp",
    wistiaVideoId: "",
    features: [
      {
        icon: <BizOrgIcon className="h-[40px] w-[40px] fill-pink/40" />,
        title: "Partner enablement",
        description:
          "UnifyrONE keeps your partners engaged and up-to-date by integrating natively with Unifyr+.",
      },
      {
        icon: <TCMAIcon className="h-[40px] w-[40px] fill-pink/40" />,
        title: "TCMA & LMS",
        description:
          "Take advantage of enterprise-class built-in tooling for enabling and educating partners.",
      },
      {
        icon: <GenerativeAIIcon className="h-[40px] w-[40px] fill-pink/40" />,
        title: "Generative AI",
        description:
          "Build your content library quickly with built-in, privacy-first AI while staying on-brand.",
      },
    ],
  },
  imagesTexts: [
    {
      badge: "Grow",
      title: "Expand your program with relevant new partners",
      image: "/images/platform/unifyrone/expand.svg",
      content:
        "Selectively make partner enablement content public to help new partners discover your brand and learn about how your business helps customers.",
    },
    {
      badge: "Start",
      imageLeft: true,
      title: "Features optimized for all stages of growth",
      image: "/images/platform/unifyrone/features.svg",
      content:
        "UnifyrONE provides a clear path from early partner program beginnings through to program maturity complete with the tools you need to scale.",
    },
  ],
  journey: {
    title: "Create partner delight",
    intro:
      "UnifyrONE provides an incredible partner experience out of the box through Unifyr+, the platform for partners.",
    image: "/images/platform/unifyrone/enablement.webp",
    features: [
      {
        title: "Keep partners engaged",
        description:
          "Reduce the occurrence of low performance long-tail partners by ensuring partners see your content and updates.",
      },
      {
        title: "Track content performance",
        description:
          "Understand which assets perform best through built-in analytics and reporting so you're focused on the right things.",
      },
      {
        title: "Build your partner network",
        description:
          "Leverage industry-leading partner discovery tools to expose your brand to new long-term partners.",
      },
    ],
  },
  features: {
    title: "Privacy-first generative AI",
    description:
      "UnifyrONE’s extensive AI features use Unifyr-owned models—your data is never shared with any third parties.",
    features: [
      {
        title: "Firmographic notes",
        description:
          "View a complete firmographic profile of accounts in UnifyrONE.",
        icon: "/images/platform/ziftONE/icons/Firmographic-notes.svg",
      },
      {
        title: "Deal & lead prediction",
        description:
          "Assess likelihood to buy and close deals with confidence.",
        icon: "/images/platform/ziftONE/icons/Deal-lead-prediction.svg",
      },
      {
        title: "Partner segmentation",
        description: "Segment your audience quickly using natural language.",
        icon: "/images/platform/ziftONE/icons/Partner-segmentation.svg",
      },
      {
        title: "Email assistance",
        description: "Produce on-brand, partner-ready email content quickly.",
        icon: "/images/platform/ziftONE/icons/Email-assistance.svg",
      },
      {
        title: "Pop-up notifications",
        description: "Notify partners of new campaigns and company updates.",
        icon: "/images/platform/ziftONE/icons/Pop-up-notifications.svg",
      },
      {
        title: "Social post assistance",
        description:
          "Write effective posts optimized for any social media channel.",
        icon: "/images/platform/ziftONE/icons/Social-post-assistance.svg",
      },
    ],
  },
  platformAccordion: {
    items: [
      {
        trigger: "Everything you need in one place",
        content:
          "UnifyrONE offers partner relationship management (PRM), through-channel marketing automation (TCMA), and a learning management system (LMS) in one product. The native and seamlessly integrated experience will make your work much easier.",
      },
      {
        trigger: "Create and evolve process automations",
        content:
          "Create a smoother experience for partners by incorporating automation at key bottlenecks, like approval checkpoints for lead and deal registration. Reducing the requirement for human intervention improves your ability to scale.",
      },
      {
        trigger: "Start proving value early",
        content:
          "With UnifyrONE's accelerated path to results and built-in reporting and analytics, you can begin demonstrating value quickly. Schedule reviews of partner program performance with confidence and a full understanding of how partners engage.",
      },
    ],
    cta: {
      title: "Ready to get started?",
      content:
        "Let's uncover how UnifyrONE PRM can accelerate your channel program.",
      button: {
        label: "Get started",
        variant: "unifyrOne" as ButtonVariant,
        link: NavLink.BookACall,
      },
    },
  },
} satisfies PlatformTemplateProps;
