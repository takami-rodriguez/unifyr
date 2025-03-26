export enum NavLink {
  Home = "/",
  About = "/about/",
  Privacy = "/privacy/",
  Terms = "/terms/",
  Product = "/products/",
  Leadership = "/leadership/",
  Careers = "/careers/",
  Platform = "/platform/",
  PlatformZiftOne = "/platform/ziftone/",
  PlatformUnifyrOne = "/platform/unifyrone/",
  PlatformUnifyrPlus = "/platform/unifyr-plus/",
  Solutions = "/solutions/",
  Blog = "/blog/",
  Atlas = "/atlas/",
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
        link: NavLink.PlatformZiftOne,
        subTitle: "The intelligent partner operations platform",
      },
      {
        label: "UnifyrONE",
        link: NavLink.PlatformUnifyrOne,
        subTitle: "Partner relationship management for small businesses",
      },
      {
        label: "Unifyr+",
        link: NavLink.PlatformUnifyrPlus,
        subTitle: "Supplier relationship management for partners",
      },
    ],
  },
  {
    label: "Resources",
    link: NavLink.Blog,
    subMenu: [
      {
        label: "Blog",
        link: NavLink.Blog,
      },
      {
        label: "Atlas",
        link: NavLink.Atlas,
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
    link: NavLink.About,
  },
];
