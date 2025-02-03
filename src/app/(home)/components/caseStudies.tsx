import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
export default function CaseStudy() {
  return (
    <section className="mx-auto max-w-5xl space-y-20 py-5 md:py-12">
      <div className="grid items-center gap-24 md:grid-cols-5">
        <div className="col-span-3 overflow-hidden">
          <div className="relative aspect-[3/2]">
            <Image
              src="/images/caseStudy.jpeg"
              alt="Case Study"
              fill
              className="rounded-xl object-cover"
            />
            <div className="absolute inset-0 p-8 text-white">
              <h2 className="mb-2 font-serif text-4xl">
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
        <div className="col-span-2 space-y-8">
          <h3 className="text-2xl font-medium">Resources</h3>
          <div className="space-y-5">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex w-full items-start gap-10">
                <div className="w-full sm:w-96">
                  <AspectRatio ratio={16 / 9} className="relative">
                    <Image
                      alt="placeholder"
                      fill
                      src="/images/image.png"
                      className="rounded-xl"
                    />
                  </AspectRatio>
                </div>
                <div>
                  <h4 className="text-medium mb-1 font-medium">LOREM IPSUM</h4>
                  <p className="text-muted-foreground text-sm">
                    Nam in velit malesuada, porttitor est in, accumsan lectus.
                    Integer sollicitudin.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
