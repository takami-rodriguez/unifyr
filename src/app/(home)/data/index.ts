import { AccordionSectionProps } from "@/app/(home)/components/featuresAccordionSection/accordionSection";
import { ImageType } from "@/types/images";

export const partnerImages: ImageType[] = [
  {
    id: "1",
    url: "/images/partners/Amazon.svg",
    alt: "Amazon",
  },
  {
    id: "2",
    url: "/images/partners/Att.svg",
    alt: "Att",
  },
  {
    id: "3",
    url: "/images/partners/LG.svg",
    alt: "LG",
  },
  {
    id: "5",
    url: "/images/partners/Dell.svg",
    alt: "Dell",
  },
  {
    id: "6",
    url: "/images/partners/Cisco.svg",
    alt: "Cisco",
  },
];

export const homeSections = [
  {
    badge: "Plan",
    title: "Build channel partnerships worth investing in",
    image: "/images/home/image1.png",
    content:
      "Shape your supplier-partner relationships into enduring strategic alliances. Through a robust partner program, you establish the foundation for sustained channel success and measurable value.",
  },
  {
    badge: "Grow",
    imageLeft: true,
    title: "Accelerate growth through mutual commitment",
    image: "/images/home/image2.png",
    content:
      "Growth happens naturally when partners and suppliers invest fully in each other's success. Unifyr strengthens this commitment by making co-selling effortless, turning strong relationships into recurring results.",
  },
  {
    badge: "Unite",
    title: "Unite channel relationships under one strategic vision",
    image: "/images/home/image3.png",
    content:
      "Strategically align your channel ecosystem. Unifyr makes it easy to coordinate partnerships for both suppliers and partners, turning relationships into a unified force for growth.",
  },
];

export const accordionSections: {
  supplier: AccordionSectionProps;
  partner: AccordionSectionProps;
} = {
  supplier: {
    mainTitle: "Let channel partnerships flourish without the hassle",
    colour: "blue500",
    para: "Traditional partner relationship management leaves partners hanging. Unifyr provides end-to-end support.",
    _uid: "EB6076EB-8FEF-46DF-9B06-FA9F720806AC",
    button: {
      label: "Discover ZiftONE",
      link: "/",
    },
    // TODO: Pick up here
    content: [
      {
        _uid: "60C5B75B-A3D1-4BA2-80A8-2DF23EC3748D",
        title: "Use channel intelligence to make decisions",
        content:
          "ZiftONE reveals the patterns that drive channel success. Detailed reporting turns granular partner activities into holistic views that reveal channel performance. The depth of visibility enables you to make decisions based on partner outcomes.",
        image: {
          url: "/images/home/accordion.png",
          alt: "",
          id: "1",
        },
      },
      {
        _uid: "A393E2EF-98E3-40EA-9070-C499E5CB6FB3",
        title: "Keep more partners transacting",
        content:
          "We've carefully considered how suppliers share resources with their partners. In the ZiftONE content management system, opt in to funnel critical updates and content to partners through Unifyr+. Turn on the partner AI adviser to have it analyze and index content that ensures it reaches partners at the moments when it matters most, saving you time and promoting partner performance.",
        image: {
          url: "/images/home/accordion.png",
          alt: "",
          id: "2",
        },
      },
      {
        _uid: "54BD5751-721B-4A7E-8FE2-B0AA2523CEFA",
        title: "Prepare your program to scale",
        content:
          "ZiftONE is designed for businesses with partner programs of all sizes and will continue to serve you as your program evolves and your business grows. Our dedicated Labs Team is here to help build the next stage of your digital partner ecosystem when you reach crucial growth milestones.",
        image: {
          url: "/images/home/accordion.png",
          alt: "",
          id: "3",
        },
      },
    ],
  },
  partner: {
    button: {
      label: "Discover Unifyr+",
      link: "/",
    },
    mainTitle: "Finally, a PRM solution for partners",
    colour: "yellow500",
    para: "Unifyr+ is a partner operations and supplier management platform built with partner workflows at the forefront.",
    _uid: "BEDBA856-1BB8-402F-8F38-4DCAA41DC272",
    content: [
      {
        _uid: "3614AAC5-3498-4676-9651-0363648F02EE",
        title: "Centralize supplier management",
        content:
          "Unifyr+ is designed to force-multiply high throughput partners by eliminating the supplier management bottleneck and opening tremendous opportunity to scale. All supplier portals are a click away through the central interface, providing easy access for fast-paced workflows.",
        image: {
          url: "/images/home/accordion.png",
          alt: "",
          id: "1",
        },
      },
      {
        _uid: "CF96F7F5-B911-4291-AD20-6E72E18152F8",
        title: "Stay fully up-to-date",
        content:
          "Suppliers that have chosen to support partners through the Unifyr+ interface will have new content and updates presented in aggregate within the supplier update feed. The feed is a crucial way to prevent new updates from slipping through the cracks.",
        image: {
          url: "/images/home/accordion.png",
          alt: "",
          id: "2",
        },
      },
      {
        _uid: "3670C5E2-9EC5-4CB3-822E-E0914914E353",
        title: "Surface content with AI",
        content:
          "The AI adviser is a partner's companion for plucking the most relevant content at critical moments. Rather than delaying for the assistance of the supplier's channel manager, consult the AI adviser to support you in completing transactions faster.",
        image: {
          url: "/images/home/accordion.png",
          alt: "",
          id: "3",
        },
      },
    ],
  },
};
