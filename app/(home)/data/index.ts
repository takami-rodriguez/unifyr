import { FeaturesAccordionSectionProps } from "@/components/featuresAccordionSection";
import { ImageType } from "@/types/images";

export const partnerImages: ImageType[] = [
  {
    id: "1",
    url: "/images/partners/Monzo.png",
    alt: "Monzo",
  },
  {
    id: "2",
    url: "/images/partners/Zoopla.png",
    alt: "Zoopla",
  },
  {
    id: "3",
    url: "/images/partners/Google.png",
    alt: "Google",
  },
  {
    id: "3",
    url: "/images/partners/Nike.png",
    alt: "Nike",
  },
  {
    id: "3",
    url: "/images/partners/Amazon.png",
    alt: "Amazon",
  },
];

export const homeSections = [
  {
    badge: "Added today",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    content:
      "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus. Vivamus cursus ante eget orci egestas malesuada.",
  },
  {
    badge: "Added today",
    imageLeft: true,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    content:
      "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus. Vivamus cursus ante eget orci egestas malesuada.",
  },
  {
    badge: "Added today",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    content:
      "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus. Vivamus cursus ante eget orci egestas malesuada.",
  },
];

export const accordionSections: FeaturesAccordionSectionProps = {
  blok: {
    mainTitle: "Lorem Ipsum Dolor Amet",
    colour: "blue500",
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
