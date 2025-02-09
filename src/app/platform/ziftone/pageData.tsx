
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
      title: "Lorem ipsum dolor sit amet.",
      titleHighlight: "ipsum",
      description:
        "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus. Vivamus cursus ante eget orci egestas malesuada.",
      image: "/images/image.png",
      button1: {
        label: "Primary action",
        variant: "primary" as ButtonVariant,
        link: NavLink.DUMMY,
      },
      button2: {
        label: "Secondary action",
        variant: "outline" as ButtonVariant,
        link: NavLink.DUMMY,
      },
    },
    introSection: {
      title: "What's new in startup",
      description:
        "We have created a new product that will help designers, developers and companies create websites for their startups quickly and easily.",
      wistiaVideoId: "zhjsfv098n",
      features: [
        {
          icon: <Target className="h-10 w-10 text-grey-400" />,
          title: "Feature 1",
          description:
            "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus. Vivamus cursus ante eget orci egestas malesuada.",
        },
        {
          icon: <Crop className="h-10 w-10 text-grey-400" />,
          title: "Feature 2",
          description:
            "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus. Vivamus cursus ante eget orci egestas malesuada.",
        },
        {
          icon: <Diamond className="h-10 w-10 text-grey-400" />,
          title: "Feature 3",
          description:
            "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus. Vivamus cursus ante eget orci egestas malesuada.",
        },
      ],
    },
    imagesTexts: [
      {
        badge: "Added today",
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        image: "/images/image 1.png",
        content:
          "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus. Vivamus cursus ante eget orci egestas malesuada.",
        button: {
          label: "Primary action",
          variant: "purple" as ButtonVariant,
          link: NavLink.DUMMY,
        },
      },
      {
        badge: "Added today",
        imageLeft: true,
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        image: "/images/image 1.png",
        content:
          "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus. Vivamus cursus ante eget orci egestas malesuada.",
        button: {
          label: "Primary action",
          variant: "purple" as ButtonVariant,
          link: NavLink.DUMMY,
        },
      },
    ],
    journey: {
      title: "This little wandering journey, without settled place of abode ",
      intro:
        " We have created a new product that will help designers, developers and companies create websites.",
      features: [
        {
          title: "10 NEW FEATURE ADDED",
          description:
            "In this new page v1, we&apos;ve added additional a multiple screens types.",
        },
        {
          title: "USEFUL SYMBOL COMPONENTS",
          description:
            "They help you to see how your text will look from the rock set up towards the moon.",
        },
        {
          title: "THOROUGHLY HANDPICKED UI",
          description:
            "The most light-up to see colors shine from our new plate to the dark side which then an excitement here.",
        },
      ],
    },
    features: {
      title: "Lorem ipsum dolor",
      features: [
        {
          title: "FEATURE ONE",
          description:
            "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus. Vivamus cursus ante eget orci egestas malesuada.",
          icon: <Code width={30} className="-mt-1" />,
        },
        {
          title: "FEATURE TWO",
          description:
            "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus. Vivamus cursus ante eget orci egestas malesuada.",
          icon: <FlaskConical width={30} className="-mt-1" />,
        },
        {
          title: "FEATURE THREE",
          description:
            "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus. Vivamus cursus ante eget orci egestas malesuada.",
          icon: <Settings width={30} className="-mt-1" />,
        },
        {
          title: "FEATURE FOUR",
          description:
            "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus. Vivamus cursus ante eget orci egestas malesuada.",
          icon: <FileText width={30} className="-mt-1" />,
        },
        {
          title: "FEATURE FIVE",
          description:
            "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus. Vivamus cursus ante eget orci egestas malesuada.",
          icon: <Calendar width={30} className="-mt-1" />,
        },
        {
          title: "FEATURE SIX",
          description:
            "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus. Vivamus cursus ante eget orci egestas malesuada.",
          icon: <DollarSign width={30} className="-mt-1" />,
        },
      ],
    },
    platformAccordion: {
      items: [
        {
          trigger: "Easy to use",
          content:
            "Startup Framework contains components and complex blocks which can easily be integrated into any design. All of the components are made in the same style, and can easily be integrated into projects, allowing you to create hundreds of solutions.",
        },
        {
          trigger: "Variety of designs",
          content:
            "Startup Framework contains components and complex blocks which can easily be integrated into any design. All of the components are made in the same style, and can easily be integrated into projects, allowing you to create hundreds of solutions.",
        },
        {
          trigger: "Feel our design",
          content:
            "Startup Framework contains components and complex blocks which can easily be integrated into any design. All of the components are made in the same style, and can easily be integrated into projects, allowing you to create hundreds of solutions.",
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