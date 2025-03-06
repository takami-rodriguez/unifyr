import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(s: string) {
  const a =
    "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
  const b =
    "aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const p = new RegExp(a.split("").join("|"), "g");
  return s
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export const markDownClasses = cn(
  "w-full space-y-6 break-words text-grey-800",
  "prose-a:text-pink prose-a:underline",
  "prose-ol:pl-6 prose-ol:list-decimal",
  "prose-ul:pl-6 prose-ul:list-disc",
  "prose-li:text-wrap",
  "prose-code:text-wrap",
  "prose-h1:pt-8 prose-h1:text-[2rem] prose-h1:leading-[2.2rem] md:prose-h1:text-[2.5rem] md:prose-h1:leading-[2.5rem]",
  "prose-h2:pt-8 prose-h2:text-[1.8rem] prose-h2:leading-[2rem] md:prose-h2:text-[2.25rem] md:prose-h2:leading-[2.25rem]",
  "prose-h3:pt-8 prose-h3:text-[1.75rem] prose-h3:leading-[1.75rem] md:prose-h3:text-[2rem] md:prose-h3:leading-[2rem]",
  "prose-p:font-resources prose-p:text-[1.125rem] prose-p:leading-[1.75rem] md:prose-p:text-[1.25rem] md:prose-p:leading-[2rem]",
);
