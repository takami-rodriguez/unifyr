import Image from "next/image";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

export default function CaseStudy() {
  return (
    <div className=" mx-auto  py-12 max-w-7xl space-y-20">
      {/* Testimonial Section */}
      <section className="text-center space-y-6">
        <blockquote className="text-4xl font-heading max-w-2xl mx-auto">
          {"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
        </blockquote>
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-purple-100">
            <Image
              src="/images/author2.jpeg"
              alt="Profile"
              width={48}
              height={48}
              className="object-cover object-center rounded-full"
            />
          </div>
          <div className="text-sm">
            <p className="font-medium">Jennifer Briggs</p>
            <p className="text-muted-foreground">
              Chief Revenue Officer, Oracle
            </p>
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
          <h3 className="text-2xl font-medium">Case Studies // Resources</h3>
          <div className="space-y-5">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex gap-10 items-start w-full">
                <div className="  w-96">
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
