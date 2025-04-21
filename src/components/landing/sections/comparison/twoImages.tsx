import { cn } from "@/lib/cn";
import ImageCompare from "@/components/ui/imageCompare";

type TwoImagesProps = {
  imageA: string;
  imageB: string;
} & React.HTMLAttributes<HTMLDivElement>;

export default function TwoImages({
  className,
  children,
  imageA: imageURLA,
  imageB: imageURLB,
  ...props
}: TwoImagesProps) {
  return (
    <div className={cn("flex flex-col md:flex-row gap-8 items-center", className)} {...props}>
      <div className="flex-0 md:size-[500px]">
        <ImageCompare imageA={imageURLA} imageB={imageURLB} />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
