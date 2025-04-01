import { BlockDataWithIcon } from "@/components/landing/types";

type FeatureProps = {
  className?: string;
} & BlockDataWithIcon;

export const Feature = ({ icon, title, description }: FeatureProps) => {
  return (
    <div className="flex flex-col space-y-5">
      {icon}
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="">{description}</p>
      </div>
    </div>
  );
};

export default Feature;
