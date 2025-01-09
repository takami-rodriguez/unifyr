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
    id: "4",
    url: "/images/partners/Siemens.svg",
    alt: "Siemens",
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
    content:
      "Shape your supplier-partner relationships into enduring strategic alliances. Through a robust partner program, you establish the foundation for sustained channel success and measurable value.",
  },
  {
    badge: "Grow",
    imageLeft: true,
    title: "Accelerate growth through mutual commitment",
    content:
      "Growth happens naturally when partners and suppliers invest fully in each other's success. Unifyr strengthens this commitment by making co-selling effortless, turning strong relationships into recurring results.",
  },
  {
    badge: "Unite",
    title: "Unite channel relationships under one strategic vision",
    content:
      "Strategically align your channel ecosystem. Unifyr makes it easy to coordinate partnerships for both suppliers and partners, turning relationships into a unified force for growth.",
  },
];

export const accordionSections: {
  supplier: AccordionSectionProps;
  partner: AccordionSectionProps;
} = {
  supplier: {
    mainTitle: "Allow your channel partnerships to flourish without the hassle",
    colour: "blue500",
    para: "Traditional partner relationship management leaves . Unifyr provides end-to-end support.",
    _uid: "EB6076EB-8FEF-46DF-9B06-FA9F720806AC",
    button: {
      label: "Discover ZiftONE",
      link: "/",
    },
    // TODO: Pick up here
    content: [
      {
        _uid: "60C5B75B-A3D1-4BA2-80A8-2DF23EC3748D",
        title: "Meaningful intelligence for channel growth",
        content:
          "ZiftONE reveals the patterns that drive channel success. Reporting & analytics turn granular partner activities into holistic views that clearly show channel performance. This depth of visibility enables you to make decisions based on genuine partner behavior.",
        image: {
          url: "/images/image.png",
          alt: "",
          id: "1",
        },
      },
      {
        _uid: "A393E2EF-98E3-40EA-9070-C499E5CB6FB3",
        title: "Content workflows that bring partners along",
        content:
          "We've carefully considered how suppliers share resources with their partners. In the ZiftONE content management system, turn on the partner AI advisor to have it analyze and catalog content for intelligent distribution that ensures your content reaches partners at the moments when it matters most, saving you time and promoting partner performance.",
        image: {
          url: "/images/image.png",
          alt: "",
          id: "2",
        },
      },
      {
        _uid: "54BD5751-721B-4A7E-8FE2-B0AA2523CEFA",
        title: "Faster partnership growth with Unifyr+",
        content:
          "The ZiftONE platform not only provides all the tools necessary to construct an integrated partner ecosystem—it also provides access to relevant partners and agencies expert in channel partnerships. This combination of tooling and key resources makes ZiftONE the most comprehensive PRM & TCMA platform available to partner and channel managers.",
        image: {
          url: "/images/image.png",
          alt: "",
          id: "3",
        },
      },
    ],
  },
  partner: {
    button: {
      label: "Discover ZiftONE",
      link: "/",
    },
    mainTitle: "Lorem Ipsum Dolor Amet",
    colour: "yellow500",
    para: "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus. Vivamus cursus ante eget orci egestas malesuada.",
    _uid: "BEDBA856-1BB8-402F-8F38-4DCAA41DC272",
    content: [
      {
        _uid: "3614AAC5-3498-4676-9651-0363648F02EE",
        title: "Lorem ipsum dolor",
        content:
          "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus. Vivamus cursus ante eget orci egestas malesuada.Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus. ",
        image: {
          url: "/images/image.png",
          alt: "",
          id: "1",
        },
      },
      {
        _uid: "CF96F7F5-B911-4291-AD20-6E72E18152F8",
        title: "Lorem ipsum dolor",
        content:
          "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus. Vivamus cursus ante eget orci egestas malesuada.Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus. ",
        image: {
          url: "/images/image.png",
          alt: "",
          id: "2",
        },
      },
      {
        _uid: "3670C5E2-9EC5-4CB3-822E-E0914914E353",
        title: "Lorem ipsum dolor",
        content:
          "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus. Vivamus cursus ante eget orci egestas malesuada.Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus. ",
        image: {
          url: "/images/image.png",
          alt: "",
          id: "3",
        },
      },
    ],
  },
};
