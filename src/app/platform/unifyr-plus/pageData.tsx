import GenerativeAIIcon from "@/components/icons/platform/generativeAI";
import OneInterfaceIcon from "@/components/icons/platform/oneInterface";
import SupplyDiscoveryIcon from "@/components/icons/platform/supplyDiscovery";
import { ButtonVariant } from "@/components/ui/button";
import { NavLink } from "@/data/navLinks";
import { PlatformTemplateProps } from "@/types/platformTemplate";

export const unifyrPlusPlatform: PlatformTemplateProps = {
  hero: {
    title: "Supplier relationship management for partners",
    titleHighlight: "management",
    description:
      "Now, partners can stay atop their deals and supplier relationships in one place.",
    image: "/images/platform/unifyr-plus/unifyrplus-header.webp",
    button1: {
      label: "Book a call",
      variant: "unifyrPlus" as ButtonVariant,
      link: NavLink.BookACall,
    },
    button2: {
      label: "Blog",
      variant: "outline" as ButtonVariant,
      link: NavLink.Blog,
    },
  },
  introSection: {
    title: "A better way to manage suppliers",
    description:
      "Make scaling easy with a platform designed for partner efficency.",
    imageUrl: "/images/platform/unifyr-plus/unifyrplus-intro.webp",
    wistiaId: "",
    features: [
      {
        icon: <OneInterfaceIcon className="h-[40px] w-[40px] fill-green-600" />,
        title: "One interface",
        description:
          "Stay informed of news and deals across all suppliers, then access their portals with a single click.",
      },
      {
        icon: <GenerativeAIIcon className="h-[40px] w-[40px] fill-green-600" />,
        title: "AI Insights",
        description:
          "Consult the AI advisor to surface new and important content for any supplier right when you need it.",
      },
      {
        icon: (
          <SupplyDiscoveryIcon className="h-[40px] w-[40px] fill-green-600" />
        ),
        title: "Supplier discovery",
        description:
          "Unlock new revenue streams through supplier discovery that knows your preferred industries.",
      },
    ],
  },
  imagesTexts: [
    {
      badge: "Grow",
      title: "Stay atop all your supplier relationships",
      image: "/images/platform/unifyr-plus/unifyrplus-screenshot-2.webp",
      content:
        "Unifyr+ SRM erases the challenge of juggling partner portals and achieving a holistic view of activities across multiple suppliers.",
    },
    {
      badge: "Scale",
      imageLeft: true,
      title: "Accommodate more suppliers than ever before",
      image: "/images/platform/unifyr-plus/unifyrplus-screenshot.webp",
      content:
        "Bring new supplier relationships into Unifyr+ SRM without fear of losing track of leads, deals, or campaigns. Discover new suppliers right in the platform.",
    },
  ],
  journey: {
    title: "Integrated natively with ZiftONE",
    intro:
      "Unifyr+ allows you to access all of your partner portals from within the platform quickly.",
    image: "/images/platform/unifyr-plus/unifyrplus-screenshot-tamco-nobg.webp",
    features: [
      {
        title: "Keep track of leads and deals",
        description:
          "It's difficult to track leads and deals across ZftONE portals; view them all from within Unifyr+.",
      },
      {
        title: "Access new supplier content",
        description:
          "Without leaving Unifyr+, access the latest news and campaign information to keep training time investment low.",
      },
      {
        title: "Skip the login screens",
        description:
          "Partners spend far too much time juggling partner portals; streamline your workflow and focus on what matters.",
      },
    ],
  },
  features: {
    title: "Be more productive every day",
    description:
      "Unifyr+ is the first step toward getting a handle on all partner operations.",
    features: [
      {
        title: "Generative AI",
        description:
          "Use AI to find the content you need to nurture leads and close deals.",
        icon: "/images/platform/unifyr-plus/icons/generative-ai.svg",
      },
      {
        title: "Supplier discovery",
        description:
          "Connect with suppliers that work in the industries you're familiar with.",
        icon: "/images/platform/unifyr-plus/icons/supplier-discovery-black.svg",
      },
      {
        title: "Deal tracking",
        description:
          "Your registered leads and deals are tracked across suppliers.",
        icon: "/images/platform/unifyr-plus/icons/deal-tracking.svg",
      },
      {
        title: "Supplier feeds",
        description:
          "Supplier campaigns and content are aggregated into a unified feed.",
        icon: "/images/platform/unifyr-plus/icons/supplier-feeds.svg",
      },
      {
        title: "Instant portal access",
        description:
          "Enter your supplier portals quickly and with a single click.",
        icon: "/images/platform/unifyr-plus/icons/instant-portal-access.svg",
      },
      {
        title: "Continued support",
        description:
          "Our team is prepared to help you succeed in growing with Unifyr+.",
        icon: "/images/platform/unifyr-plus/icons/continued-support.svg",
      },
    ],
  },
  platformAccordion: {
    items: [
      {
        trigger: "Spend less time catching up",
        content:
          "Partners spend a disproportionate amount of time catching up on content they've missed. Unifyr+'s supplier updates feed ensures you spend less time catching up and more time selling in the channel.",
      },
      {
        trigger: "Unify your channel tools and workflows",
        content:
          "Unifyr+ creates the most cohesive day-to-day experience for partners of any available partner enablement tools. The platform allows you to work at maximum efficiency without obstacles.",
      },
      {
        trigger: "Understand your revenue impact",
        content:
          "Gaining visibility into the results of your efforts can be difficult when the data is spread across platforms that don't integrate. Unifyr+ aggregates that data from all your ZiftONE suppliers.",
      },
    ],
    cta: {
      title: "Ready to get started?",
      content:
        "Let's uncover how Unifyr+ SRM can accelerate your channel program.",
      button: {
        label: "Get started",
        variant: "unifyrPlus" as ButtonVariant,
        link: NavLink.BookACall,
      },
    },
  },
};
