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
      "When partners and suppliers invest fully in each other's success, growth happens naturally. Unifyr reinforces this commitment by making resource sharing and co-selling effortless, turning strong relationships into results.",
  },
  {
    badge: "Unite",
    title: "Unite channel relationships under one strategic vision",
    content:
      "Achieve channel ecosystem harmony through strategic alignment. Unifyr makes it easy to coordinate many partnerships, turning individual relationships into a unified force for growth.",
  },
];

export const accordionSections: {
  supplier: AccordionSectionProps;
  partner: AccordionSectionProps;
} = {
  supplier: {
    mainTitle: "Channel partner orchestration with networking built in",
    colour: "blue500",
    para: "Traditional partner relationship management leaves the hard parts up to you. Unifyr provides end-to-end support.",
    _uid: "asfasr123123",
    content: [
      {
        _uid: "asdasd",
        title: "Meaningful Intelligence  for channel growth",
        content:
          "ZiftONE reveals the patterns that drive channel success. Reporting & analytics turn granular partner activities into holistic views that clearly show channel performance. This depth of visibility enables you to make decisions based on genuine partner behavior.",
        image: {
          url: "/images/image.png",
          alt: "",
          id: "1",
        },
      },
      {
        _uid: "asdasd123",
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
        _uid: "asdasd456",
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
    mainTitle: "Lorem Ipsum Dolor Amet",
    colour: "yellow500",
    para: "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus. Vivamus cursus ante eget orci egestas malesuada.",
    _uid: "asfasr123123",
    content: [
      {
        _uid: "asdasd",
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
        _uid: "asdasd123",
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
        _uid: "asdasd456",
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
