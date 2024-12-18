import { Diamond, RefreshCw, Target } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import Link from "next/link";
import Arrow from "../icons/arrow";
import { bgGradient } from "@/data/styleHelpers";

const features = [
  {
    icon: <Target className="h-[42px] w-[42px] text-grey-400" />,
    title: "Partner portal",
    description:
      "Build an experience for your partners that encourages commitment and mutual growth.",
    link: "#",
  },
  {
    icon: <Diamond className="h-[42px] w-[42px] text-grey-400" />,
    title: "Integrations",
    description:
      "Connect seamlessly with your existing tools to ensure channel operations remain perfectly synchronized.",
    link: "#",
  },
  {
    icon: <RefreshCw className="h-[42px] w-[42px] text-grey-400" />,
    title: "Analytics",
    description:
      "Transform data into actionable intelligence through visualizations that highlight partner performance both individually and holistically.",
    link: "#",
  },
];

//  TODO - update content based on tab
export default function FeaturesAndTabs() {
  return (
    <div className="px-5 ">
      <div className="rounded-[3rem] overflow-hidden" style={bgGradient}>
        <div className="container mx-auto px-24 py-6 ">
          <div className="flex items-center ">
            <Tabs defaultValue="zift">
              <TabsList>
                <TabsTrigger value="zift">ZiftONE</TabsTrigger>
                <TabsTrigger value="unifyr-plus">Unifyr+</TabsTrigger>
                <TabsTrigger value="unifyr-pro">Unifyr Pro</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        <div className="container mx-auto px-24 py-12">
          <div className="grid gap-12 md:grid-cols-2 md:gap-8 lg:gap-12">
            <div className="space-y-6 max-w-lg pt-8">
              <h4 className="text-4xl font-bold sm:text-5xl leading-14 ">
                The industry-leading PRM & TCMA platform
              </h4>
              <p className="text-gray-900/80 font-light text-xl">
                ZiftONE is the most advanced PRM solution with key integrations
                into the platforms you already use. 
              </p>
            </div>
            <div className="flex items-center justify-center rounded-2xl border-2 border-white">
              <AspectRatio className="relative" ratio={16 / 9}>
                <Image
                  src="/images/image.png"
                  alt="hero"
                  className="object-cover object-center rounded-xl"
                  fill
                />
              </AspectRatio>
            </div>
          </div>
          <div className="mt-24 grid gap-12 md:grid-cols-3 md:gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <div key={index} className="space-y-4">
                {feature.icon}
                <h2 className="text-[22px] ">{feature.title}</h2>
                <p className="text-gray-900/80 w-[290px]">
                  {feature.description}
                </p>

                <Link href={feature.link} className="flex font-semibold py-2">
                  Learn more <Arrow />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
