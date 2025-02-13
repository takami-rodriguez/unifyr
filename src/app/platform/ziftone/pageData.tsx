import { ButtonVariant } from "@/components/ui/button";
import { NavLink } from "@/data/navLinks";
import Image from "next/image";

export const ziftOnePlatform = {
  hero: {
    title: "The intelligent partner operations platform",
    titleHighlight: "intelligent",
    description:
      "Meet the next evolution of ZiftONE PRM & TCMA with smarter ways to grow in the channel.",
    image: "/images/platform/ziftONE/images/ziftone-header-image.png",
    button1: {
      label: "Book a call",
      variant: "secondary" as ButtonVariant,
      link: NavLink.BookACall,
    },
    button2: {
      label: "Blog",
      variant: "outline" as ButtonVariant,
      link: NavLink.Blog,
    },
  },
  introSection: {
    title: "Take a look",
    description:
      "See why ZiftONE has been the industry leader in PRM since 2006.",
    wistiaVideoId: "6yip3slsj5",
    features: [
      {
        icon: (
          <Image
            src="/images/platform/ziftONE/icons/Bespoke-portal.svg"
            alt="Bespoke-portal"
            width={40}
            height={40}
            className="h-10 w-10 text-grey-400"
          />
        ),
        title: "Bespoke portal",
        description:
          "Our team will help you to build a partner portal that exudes your brand look and feel.",
      },
      {
        icon: (
          <Image
            src="/images/platform/ziftONE/icons/Generative-AI.svg"
            alt="Generative-AI"
            width={40}
            height={40}
            className="h-10 w-10 text-grey-400"
          />
        ),
        title: "Generative AI",
        description:
          "Grow your content library with built-in, privacy-first AI to save time and stay on-brand.",
      },
      {
        icon: (
          <Image
            src="/images/platform/ziftONE/icons/TCMA-LMS.svg"
            alt="TCMA-LMS"
            width={40}
            height={40}
            className="h-10 w-10 text-grey-400"
          />
        ),
        title: "TCMA & LMS",
        description:
          "Look no further for the other critical systems you need to nurture channel partnerships.",
      },
    ],
  },
  imagesTexts: [
    {
      badge: "BUILD",
      title: "Create an incredible partner experience—but not alone",
      image: "/images/platform/ziftONE/images/ziftone-partner-portal.png",
      content:
        "Unlike alternative PRM offerings, ZiftONE includes bespoke partner portal and integration implementations tailored to your requirements.",
    },
    {
      badge: "Scale",
      imageLeft: true,
      title: "ZiftONE accommodates channel programs of all sizes",
      image: "/images/platform/ziftONE/images/ziftone-scale.png",
      content:
        "Whether you are entering the channel for the first time or implementing a robust enterprise channel presence, ZiftONE will continue to serve you.",
    },
  ],
  journey: {
    title: "Uncontested partner enablement",
    intro:
      "ZiftONE is more than just PRM; it integrates with Unifyr+, the partner-first multi-supplier management portal.",
      image: "/images/platform/ziftONE/images/ziftone-screenshot-1-blue.png",
    features: [
      {
        title: "Meet partners where they are",
        description:
          "Hook into the Unifyr+ content feed to reduce the occurrence of low performance long-tail partners.",
      },
      {
        title: "Discover what works",
        description:
          "Track partner engagement and asset performance through reporting in the ZiftONE administrative panel.",
      },
      {
        title: "Focus on the right tasks",
        description:
          "Spend less time competing for partner attention and more time directing your channel program toward mutual growth.",
      },
    ],
  },
  features: {
    title: "Privacy-first generative AI",
    description:"ZiftONE’s extensive AI features use Unifyr-owned models—your data is never shared with any third parties.",
    features: [
      {
        title: "Firmographic notes",
        description:
          "View a complete firmographic profile of accounts in ZiftONE.",
        icon: "/images/platform/ziftONE/icons/Firmographic-notes.svg"
      },
      {
        title: "Deal & lead prediction",
        description:
          "Assess likelihood to buy and close deals with confidence.",
        icon: "/images/platform/ziftONE/icons/Deal-lead-prediction.svg"
      },
      {
        title: "Partner segmentation",
        description: "Segment your audience quickly using natural language.",
        icon: "/images/platform/ziftONE/icons/Partner-segmentation.svg"
      },
      {
        title: "Email assistance",
        description: "Produce on-brand, partner-ready email content quickly.",
        icon: "/images/platform/ziftONE/icons/Email-assistance.svg"
      },
      {
        title: "Pop-up notifications",
        description: "Notify partners of new campaigns and company updates.",
        icon: "/images/platform/ziftONE/icons/Pop-up-notifications.svg"
      },
      {
        title: "Social post assistance",
        description:
          "Write effective posts optimized for any social media channel.",
        icon: "/images/platform/ziftONE/icons/Social-post-assistance.svg"
      },
    ],
  },
  platformAccordion: {
    items: [
      {
        trigger: "Unify your channel tools and workflows",
        content:
          "ZiftONE offers partner relationship management (PRM), through-channel marketing automation (TCMA), and a learning management system (LMS) in one product. The native and seamlessly integrated experience will make your work much easier.",
      },
      {
        trigger: "Manage market development funds (MDF)",
        content:
          "Incentivize partner activities with a granularly configured MDF program. ZiftONE integrates with any system (CRM, ERP, etc.) required to ensure your program is run precisely the way you’ve designed it.",
      },
      {
        trigger: "Prove value with reporting and analytics",
        content:
          "ZiftONE makes it easy to prove ROI and drill down into the performance of assets and partners. Maintain complete visibility of the data that matters most in making critical business decisions related to growth and channel partnerships.",
      },
    ],
    cta: {
      title: "Ready to get started?",
      content:
        "Let's uncover how ZiftONE PRM can accelerate your channel program.",
      button: {
        label: "Get started",
        variant: "secondary" as ButtonVariant,
        link: NavLink.BookACall,
      },
    },
  },
};
