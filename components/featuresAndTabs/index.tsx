import { Diamond, RefreshCw, Target } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import Link from "next/link";
import Arrow from "../icons/arrow";
export default function FeaturesAndTabs() {
  return (
    <div className="px-5">
      <div
        className=" rounded-2xl overflow-hidden"
        style={{
          background:
            "radial-gradient(461.91% 160.49% at 17.47% -33.36%, rgba(215, 14, 134, 0.04) 0%, rgba(36, 56, 139, 0.05) 99.68%)",
        }}
      >
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
            <div className="space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                <Target />
              </div>
              <h2 className="text-xl font-semibold">Partner portal</h2>
              <p className="text-gray-600">
                Build an experience for your partners that encourages commitment
                and mutual growth.
              </p>
              <Link href="#">
                Learn more <Arrow />
              </Link>
            </div>
            <div className="space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                <RefreshCw className="h-6 w-6 text-indigo-600" />
              </div>
              <h2 className="text-xl font-semibold">Integrations</h2>
              <p className="text-gray-600">
                Connect seamlessly with your existing tools to ensure channel
                operations remain perfectly synchronized.
              </p>
              <Link href="#">
                Learn more <Arrow />
              </Link>
            </div>
            <div className="space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                <Diamond className="h-6 w-6 text-indigo-600" />
              </div>
              <h2 className="text-xl font-semibold">Analytics</h2>
              <p className="text-gray-600">
                Transform data into actionable intelligence through
                visualizations that highlight partner performance both
                individually and holistically.
              </p>
              <Link href="#"> 
                Learn more <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
