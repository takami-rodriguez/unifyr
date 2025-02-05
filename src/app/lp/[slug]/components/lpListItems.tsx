import { Check } from "lucide-react";
import React from "react";

type LPListItemsProps = {
  items: string[];
};

const LPListItems = async ({ items }: LPListItemsProps) => {
  return (
    <ul className="space-y-4 text-lg text-grey-900/80">
      {items.map((item, index) => (
        <li key={item + index} className="flex items-start space-x-3">
          <div className="mt-1.5 h-[20px] min-w-[20px] rounded-full bg-gradient p-1 text-white">
            <Check size={"md"} />
          </div>
          <p>{item}</p>
        </li>
      ))}
    </ul>
  );
};

export default LPListItems;
