import Image from "next/image";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

export default function CaseStudy() {
  return (
    <div className=" mx-auto  py-12 max-w-5xl space-y-20">
      {/* Testimonial Section */}
      <section className="text-center space-y-8">
        <blockquote className="text-5xl font-bold font-heading max-w-5xl mx-auto">
          {"“ZiftONE streamlined our partner program, boosting engagement across 22+ countries.”"}
        </blockquote>
        <div className="flex flex-col items-center gap-3">
            <Image
              src="/images/partners/Panasonic.svg"
              alt="Panasonic"
              width={251}
              height={40}
            />
          <div className="text-lg">
            <p className="">Chief Revenue Officer, Panasonic Connect</p>
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="grid md:grid-cols-5 gap-24 items-center">
        <div className="overflow-hidden col-span-3">
          <div className="relative aspect-[3/2] ">
            <Image
              src="/images/caseStudy.jpeg"
              alt="Case Study"
             fill
              className="object-cover rounded-xl"
            />
            <div className="absolute inset-0 p-8 text-white">
              <h2 className="text-4xl font-serif mb-2">
                Lorem Ipsum
                <br />
                Case Study
              </h2>
              <p className="text-sm opacity-80">
                Nam in velit malesuada,
                <br />
                porttitor est.
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-8 col-span-2">
          <h3 className="text-2xl font-medium">Resources</h3>
          <div className="space-y-5">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex gap-10 items-start w-full">
                <div className="w-full  sm:w-96">
                  <AspectRatio ratio={16 / 9} className="relative">
                    <Image alt="placeholder" fill src="/images/image.png" className="rounded-xl"/>
                  </AspectRatio>
                </div>
                <div>
                  <h4 className="font-medium mb-1 text-medium">LOREM IPSUM</h4>
                  <p className="text-sm text-muted-foreground">
                    Nam in velit malesuada, porttitor est in, accumsan lectus.
                    Integer sollicitudin.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
