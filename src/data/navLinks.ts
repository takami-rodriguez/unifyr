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
    label: "About",
    link: NavLink.About,
  },
  {
    label: "Platform",
    link: NavLink.Platform,
    subMenu: [
      {
        label: "Ziftone",
        subTitle: "The most advanced PRM solution ",
        link: NavLink.PlatformZift,
      },
      
    ],
  },
  // {
  //   label: "Product",
  //   link: NavLink.Product,
  // },
  // {
  //   label: "Solutions",
  //   link: NavLink.Solutions,
  // },
  {
    label: "Resources",
    link: NavLink.Resources,
  },
  // {
  //   label: "Company",
  //   link: NavLink.Company,
  // },
];
