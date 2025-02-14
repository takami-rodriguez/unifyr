import { TeamMemberType } from "./components/leadership/leadershipGrid";

export const aboutPageData = {
  hero: {
    title: "About",
    image: {
      src: "/images/about/aboutHero.png",
      alt: "Unifyr | About us",
    },
  },
  intro: [
    "Unifyr’s vision is clear: collaborate with organizations to expand their reach, revenue and profit. We empower suppliers, partners and agencies by simplyifyong the complexities of the channel ecosystem.",
    "With deep industry knowledge and a commitment to driving results, the Unifyr leadership team ensures the company remains at the forefront of innovation, delivering lasting value to its clients.",
  ],
  leadership: {
    title: "Leadership Team",
    members: [
      {
        image: {
          src: "/images/about/team/tobias.png",
          alt: "Tobias Hartmann",
        },
        name: "Tobias Hartmann",
        title: "Chief Executive Officer",
      },
      {
        image: {
          src: "/images/about/team/sayoung.png",
          alt: "Sayoung Jung",
        },
        name: "Sayoung Jung",
        title: "Head of Strategy & COO",
      },
      {
        image: {
          src: "/images/about/team/lionel.png",
          alt: "Lionel Farr",
        },
        name: "Lionel Farr",
        title: "Chief Technology Officer",
      },
      {
        image: {
          src: "/images/about/team/adrian.png",
          alt: "Adrian Muniz",
        },
        name: "Adrian Muniz",
        title: "Chief Financial Officer",
      },
      {
        image: {
          src: "/images/about/team/cosmo.png",
          alt: "Cosmo Mariano",
        },
        name: "Cosmo Mariano",
        title: "Chief Customer Officer",
      },
      {
        image: {
          src: "/images/about/team/laura.png",
          alt: "Laura Crawford",
        },
        name: "Laura Crawford",
        title: "Chief People Officer",
      },
    ] as TeamMemberType[],
  },
  timelineData: [
    {
      year: "2022",
      months: [
        {
          month: "Apr",
          colour: "bg-sky-200",
          content:
            "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus vivamus ante.",
        },
        {
          month: "Jun",
          colour: "bg-pink-300",
          content:
            "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus vivamus ante.",
        },
        {
          month: "Oct",
          colour: "bg-yellow-200",
          content:
            "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus vivamus ante.",
        },
        {
          month: "Nov",
          colour: "bg-emerald-200",
          content:
            "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus vivamus ante.",
        },
      ],
    },
    {
      year: "2023",
      months: [
        {
          month: "Mar",
          colour: "bg-sky-200",
          content:
            "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus vivamus ante.",
        },
        {
          month: "Jun",
          colour: "bg-violet-200",
          content:
            "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus vivamus ante.",
        },
        {
          month: "Jun",
          colour: "bg-emerald-200",
          content:
            "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus vivamus ante.",
        },
        {
          month: "Nov",
          colour: "bg-sky-200",
          content:
            "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus vivamus ante.",
        },
      ],
    },
    {
      year: "2024",
      months: [
        {
          month: "Jan",
          colour: "bg-yellow-200",
          content:
            "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus vivamus ante.",
        },
        {
          month: "Mar",
          colour: "bg-sky-200",
          content:
            "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus vivamus ante vel cursus mauris cursus vivamus ante.",
        },
        {
          month: "Jun",
          colour: "bg-pink-300",
          content:
            "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus cursus mauris cursus vivamus ante vel cursus mauris cursus vivamus ante.",
        },
        {
          month: "Nov",
          colour: "bg-violet-200",
          content:
            "Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus vivamus ante.",
        },
      ],
    },
  ],
};
