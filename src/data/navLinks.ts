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
  PlatformUnifryPlus = "/platform/unifyr-plus/",
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
        link: NavLink.PlatformZift,
        subTitle: "The intelligent partner operations platform",
      },
      {
        label: "Unifyr+",
        link: NavLink.PlatformUnifryPlus,
        subTitle: "Supplier relationship management for partners"
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
  }
];
