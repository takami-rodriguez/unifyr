import { Diamond, RefreshCw, Target } from "lucide-react";

export enum TabValue {
  zift = "zift",
  unifyrPlus = "unifyr-plus",
  unifyrPro = "unifyr-pro",
}

export const tabsData = {
  [TabValue.zift]: {
    title: "The industry-leading PRM & TCMA platform",
    description:
      "ZiftONE is the most advanced PRM solution with key integrations into the platforms you already use.",
    features: [
      {
        link:"#",
        icon: <Target className="h-[42px] w-[42px] text-grey-400" />,
        title: "Partner portal",
        description:
          "Build an experience for your partners that encourages commitment and mutual growth.",
      },
      {
        link:"#",
        icon: <Diamond className="h-[42px] w-[42px] text-grey-400" />,
        title: "Integrations",
        description:
          "Connect seamlessly with your existing tools to ensure channel operations remain perfectly synchronized.",
      },
      {
        link:"#",
        icon: <RefreshCw className="h-[42px] w-[42px] text-grey-400" />,
        title: "Analytics",
        description:
          "Transform data into actionable intelligence through visualizations that highlight partner performance both individually and holistically.",
      },
    ],
  },
  [TabValue.unifyrPlus]: {
    title: "The first curated, partner-driven network",
    description:
      "Unifyr+ is the first central command center for partners designed to maximize partner workflow efficiency.",
    features: [
      {
        link:"#",
        icon: <Target className="h-[42px] w-[42px] text-grey-400" />,
        title: "Supplier dashboard",
        description:
          "Manage all supplier relationships from an intuitive dashboard.",
      },
      {
        link:"#",
        icon: <Diamond className="h-[42px] w-[42px] text-grey-400" />,
        title: "AI advisor",
        description:
          "Find content when you need it for any supplier by consulting the AI advisor knowledgeable on all of your relationships.",
      },
      {
        link:"#",
        icon: <RefreshCw className="h-[42px] w-[42px] text-grey-400" />,
        title: "Analytics",
        description:
          "Efficiently register new deals and keep track of your existing customer relationships to keep your connections healthy.",
      },
    ],
  },
  [TabValue.unifyrPro]: {
    title: "",
    description:
      "",
    features: [
      {
        link:"#",
        icon: <Target className="h-[42px] w-[42px] text-grey-400" />,
        title: "",
        description:
          "",
      },
      {
        link:"#",
        icon: <Diamond className="h-[42px] w-[42px] text-grey-400" />,
        title: "",
        description:
          "",
      },
      {
        link:"#",
        icon: <RefreshCw className="h-[42px] w-[42px] text-grey-400" />,
        title: "",
        description:
          "",
      },
    ],
  },
};
