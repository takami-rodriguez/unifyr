export enum TabValue {
  zift = "zift",
  unifyrPlus = "unifyr-plus",
  unifyrPro = "unifyr-pro",
}

export const tabsData = {
  [TabValue.zift]: {
    title: "Scalable PRM for the smartest companies",
    description:
      "ZiftONE is the most advanced PRM solution with key integrations into the platforms you already use.",
    features: [
      {
        link:"#",
        icon: "/images/icons/Partner-portal.svg",
        title: "Partner portal",
        description:
          "Build an experience for your partners that educates and encourages commitment. Connects natively to Unifyr+.",
      },
      {
        link:"#",
        icon: "/images/icons/Workflows.svg",
        title: "Workflows",
        description:
          "Build automation workflows that reflect how your business operates. Reduce manual effort from your channel managers.",
      },
      {
        link:"#",
        icon: "/images/icons/Reporting-and-Analytics.svg",
        title: "Reporting & analytics",
        description:
          "Turn data into actionable intelligence through visualizations that highlight partner performance at all levels.",
      },
    ],
  },
  [TabValue.unifyrPro]: {
    title: "The fastest way to find new business",
    description:
      "Unifyr Pro is a marketplace for agencies to discover suppliers and partners in need of channel expertise.",
    features: [
      {
        link:"#",
        icon: "/images/icons/manage-offerings.svg",
        title: "Manage offerings",
        description:
          "Share your offerings with a network of suppliers and partners then transact within the platform.",
      },
      {
        link:"#",
        icon: "/images/icons/Build-your-reputation.svg",
        title: "Build your reputation",
        description:
          "Grow your customer base and earn positive reviews from helping companies create channel program success.",
      },
      {
        link:"#",
        icon: "/images/icons/Track-your-business.svg",
        title: "Track your business",
        description:
          "Keep tabs on your active business relationships, earned revenue, and new opportunities all in one place.",
      },
    ],
  },
  [TabValue.unifyrPlus]: {
    title: "Central command center for efficient partners",
    description:
      "Unifyr+ is the first unified interface for partners that work with many suppliers.",
    features: [
      {
        link:"#",
        icon: "/images/icons/update-feed-2.svg",
        title: "Update feed",
        description:
          "Unifyr+ provides an always-active stream of crucial highlights from all suppliers to keep you informed.",
      },
      {
        link:"#",
        icon: "/images/icons/ai-2.svg",
        title: "AI advisor",
        description:
          "Surface key content from any supplier when you need it by consulting our privacy-centric AI advisor.",
      },
      {
        link:"#",
        icon: "/images/icons/analytics.svg",
        title: "Analytics",
        description:
          "Track and improve your business performance and efficiency over time with insights that deepen as you do business.",
      },
    ],
  },
};
