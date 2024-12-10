import { Diamond, RefreshCw, Target } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";
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
            <div className="space-y-6 max-w-md pt-8">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-heading">
                Lorem ipsum
              </h1>
              <p className="text-gray-900/80 font-light text-xl">
                Praesent placerat ipsum nec mi maximus, vel cursus mauris
                cursus. Vivamus cursus ante eget orci egestas malesuada. Praese
                placerat ipsum nec mi maximus, vel cursui mauris cursus.
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
                <Target/>
              </div>
              <h2 className="text-xl font-semibold">Feature one</h2>
              <p className="text-gray-600">
                Praesent placerat ipsum nec mi maximus, vel cursus mauris
                cursus. Vivamus cursus ante eget orci egestas malesuada.
              </p>
            </div>
            <div className="space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                <RefreshCw className="h-6 w-6 text-indigo-600" />
              </div>
              <h2 className="text-xl font-semibold">Feature two</h2>
              <p className="text-gray-600">
                Praesent placerat ipsum nec mi maximus, vel cursus mauris
                cursus. Vivamus cursus ante eget orci egestas malesuada.
              </p>
            </div>
            <div className="space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                <Diamond className="h-6 w-6 text-indigo-600" />
              </div>
              <h2 className="text-xl font-semibold">Feature three</h2>
              <p className="text-gray-600">
                Praesent placerat ipsum nec mi maximus, vel cursus mauris
                cursus. Vivamus cursus ante eget orci egestas malesuada.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
