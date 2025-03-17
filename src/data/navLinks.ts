export enum NavLink {
  Home = "/",
  About = "/about/",
  Privacy = "/privacy/",
  Terms = "/terms/",
  Product = "/products/",
  Leadership = "/leadership/",
  Careers = "/careers/",
  Platform = "/platform/",
  PlatformZift = "/platform/ziftone/",
  PlatformUnifyrOne = "/platform/unifyrone/",
  PlatformUnifyrPlus = "/platform/unifyr-plus/",
  Solutions = "/solutions/",
  Blog = "/blog/",
  Company = "/company/",
  BookACall = "/start/",
  DUMMY = "#",
}

export const navLinks = [
  {
    label: "Platform",
    link: NavLink.Platform,
    subMenu: [
      {
        label: "ZiftONE",
        link: "/platform/ziftone/",
        subTitle: "The intelligent partner operations platform",
      },
      {
        label: "UnifyrONE",
        link: "/platform/unifyrone/",
        subTitle: "Partner relationship management for small businesses",
      },
      {
        label: "Unifyr+",
        link: "/platform/unifyr-plus/",
        subTitle: "Supplier relationship management for partners",
      },
    ],
  },
  {
    label: "Resources",
    link: "/blog/",
    subMenu: [
      {
        label: "Blog",
        link: "/blog/",
      },
      {
        label: "Support (Partner Portal)",
        link: "https://ziftone.zendesk.com/hc/en-us",
      },
      {
        label: "Support (ZiftONE Admin)",
        link: "https://ziftoneadmin.zendesk.com/hc/en-us",
      },
    ],
  },
  {
    label: "About",
    link: "/about/",
  },
];
