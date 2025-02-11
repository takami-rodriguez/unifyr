
import { ButtonVariant } from "@/components/ui/button";
import {
  Calendar,
  Code,
  Crop,
  Diamond,
  DollarSign,
  FileText,
  FlaskConical,
  Settings,
  Target,
} from "lucide-react";
import { NavLink } from "@/data/navLinks";


export const ziftOnePlatform = {
    hero: {
      title: "The intelligent partner operations platform",
      titleHighlight: "intelligent",
      description:
        "Meet the next evolution of ZiftONE PRM & TCMA with smarter ways to grow in the channel.",
      image: "/images/image.png",
      button1: {
        label: "Book a call",
        variant: "secondary" as ButtonVariant,
        link: NavLink.BookACall,
      },
      button2: {
        label: "Blog",
        variant: "outline" as ButtonVariant,
        link: NavLink.Resources,
      },
    },
    introSection: {
      title: "Take a look",
      description:
        "See why ZiftONE has been the industry leader in PRM since 2006.",
      wistiaVideoId: "zhjsfv098n",
      features: [
        {
          icon: <Target className="h-10 w-10 text-grey-400" />,
          title: "Bespoke portal",
          description:
            "Our team will help you to build a partner portal that exudes your brand look and feel.",
        },
        {
          icon: <Crop className="h-10 w-10 text-grey-400" />,
          title: "Generative AI",
          description:
            "Grow your content library with built-in, privacy-first AI to save time and stay on-brand.",
        },
        {
          icon: <Diamond className="h-10 w-10 text-grey-400" />,
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
        image: "/images/image 1.png",
        content:
          "Unlike alternative PRM offerings, ZiftONE includes bespoke partner portal and integration implementations tailored to your requirements.",
      },
      {
        badge: "Scale",
        imageLeft: true,
        title: "ZiftONE accommodates channel programs of all sizes",
        image: "/images/image 1.png",
        content:
          "Whether you are entering the channel for the first time or implementing a robust enterprise channel presence, ZiftONE will continue to serve you.",
      },
    ],
    journey: {
      title: "Uncontested partner enablement",
      intro:
        "ZiftONE is more than just PRM; it integrates with Unifyr+, the partner-first multi-supplier management portal.",
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
      features: [
        {
          title: "Firmographic notes",
          description:
            "View a complete firmographic profile of accounts in ZiftONE.",
          icon: <Code width={30} className="-mt-[.125rem]" />,
        },
        {
          title: "Deal & lead prediction",
          description:
            "Assess likelihood to buy and close deals with confidence.",
          icon: <FlaskConical width={30} className="-mt-[.125rem]" />,
        },
        {
          title: "Partner segmentation",
          description:
            "Segment your audience quickly using natural language.",
          icon: <Settings width={30} className="-mt-[.125rem]" />,
        },
        {
          title: "Email assistance",
          description:
            "Produce on-brand, partner-ready email content quickly.",
          icon: <FileText width={30} className="-mt-[.125rem]" />,
        },
        {
          title: "Pop-up notifications",
          description:
            "Notify partners of new campaigns and company updates.",
          icon: <Calendar width={30} className="-mt-[.125rem]" />,
        },
        {
          title: "Social post assistance",
          description:
            "Write effective posts optimized for any social media channel.",
          icon: <DollarSign width={30} className="-mt-[.125rem]" />,
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
          trigger: "Variety of designs",
          content:
            "ZiftONE offers partner relationship management (PRM), through-channel marketing automation (TCMA), and a learning management system (LMS) in one product. The native and seamlessly integrated experience will make your work much easier.",
        },
        {
          trigger: "Feel our design",
          content:
            "ZiftONE offers partner relationship management (PRM), through-channel marketing automation (TCMA), and a learning management system (LMS) in one product. The native and seamlessly integrated experience will make your work much easier.",
        },
      ],
      cta: {
        title: "Have more questions?",
        content:
          "Startup Framework includes great form options for your startup projects.",
        button: {
          label: "Primary Action",
          variant: "secondary" as ButtonVariant,
          link: NavLink.DUMMY,
        },
      },
    },
  };