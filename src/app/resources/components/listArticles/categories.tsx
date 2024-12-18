import React from "react";
import { categories } from "../_helpers";
import clsx from "clsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/forms/select";

type CategoriesProps = {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

const Categories = ({
  selectedCategory,
  setSelectedCategory,
}: CategoriesProps) => {
  return (
    <>
      <div className="hidden lg:flex items-center justify-center font-bold max-w-5xl mx-auto  space-x-4 py-4">
        {categories.map((category) => (
          <button
            key={category + "categoryTab"}
            onClick={() => setSelectedCategory(category)}
            className={clsx("px-4 py-2 text-sm font-bold rounded-lg", {
              "bg-primary text-white border-primary border":
                selectedCategory === category,
              "text-grey-900 border-grey-900 border":
                selectedCategory !== category,
            })}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="lg:hidden mb-8">
        <Select onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-auto mx-auto bg-violet-500 text-white rounded-full">
            <SelectValue
              placeholder={
                selectedCategory.charAt(0).toUpperCase() +
                selectedCategory.slice(1)
              }
            />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {categories.map((category) => (
              <SelectItem
                key={category + "categoryTab"}
                value={category}
              >
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default Categories;
