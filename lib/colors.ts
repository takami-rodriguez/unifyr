import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config";

const { theme } = resolveConfig(tailwindConfig);

export const primary = theme?.colors?.primary;
export const secondary = theme?.colors?.secondary;
export const error = theme?.colors?.error;

export type ColorStrings = "primary" | "secondary" | "tertiary";

export const getBorderColor = (color: ColorStrings) => {
  return `border-${color}`;
};

export const getBGColor = (color: ColorStrings) => {
  return `border-${color}`;
};
