import type { JSX as Jsx } from "react/jsx-runtime";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
  namespace JSX {
    type ElementClass = Jsx.ElementClass;
    type Element = Jsx.Element;
    type IntrinsicElements = Jsx.IntrinsicElements;
  }
}
