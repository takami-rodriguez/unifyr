export enum NavLink {
  Home = "/",
  About = "/about/",
  Privacy = "/privacy/",
  Terms = "/terms/",
  Product = "/products/",
  Leadership = "/leadership/",
  Careers = "/careers/",
  Platform = "/platform/",
  PlatformZift = "/platform/ziftone",
  Solutions = "/solutions/",
  Resources = "/resources/",
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
        subTitle: "The most advanced PRM solution ",
        link: NavLink.PlatformZift,
      },
      
    ],
  },
  {
    label: "Resources",
    link: NavLink.Resources,
    subMenu: [
      {
        label: "Blog",
        link: NavLink.Resources,
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
];
