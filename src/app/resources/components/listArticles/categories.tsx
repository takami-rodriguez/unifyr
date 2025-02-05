import React from "react";
import { categories } from "../_helpers";
import clsx from "clsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/forms/components/select";

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
      <div className="mx-auto hidden max-w-5xl items-center justify-center space-x-4 py-4 font-bold lg:flex">
        {categories.map((category) => (
          <button
            key={category + "categoryTab"}
            onClick={() => setSelectedCategory(category)}
            className={clsx("rounded-lg px-4 py-2 text-sm font-bold", {
              "border border-primary bg-primary text-white":
                selectedCategory === category,
              "border border-grey-900 text-grey-900":
                selectedCategory !== category,
            })}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="mb-8 lg:hidden">
        <Select onValueChange={setSelectedCategory}>
          <SelectTrigger className="mx-auto w-auto rounded-full bg-violet-500 text-white">
            <SelectValue
              placeholder={
                selectedCategory.charAt(0).toUpperCase() +
                selectedCategory.slice(1)
              }
            />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {categories.map((category) => (
              <SelectItem key={category + "categoryTab"} value={category}>
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
