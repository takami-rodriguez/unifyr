export type LandingPageProps = {
  formId: string;
  title: string;
  titleHighlight: string;
  image: string;
  paragraphs: string[];
  listItems: string[];
};

export const g2Data: LandingPageProps = {
  formId: "g2_formID",
  title: "Lorem ipsum dolor sit amet",
  titleHighlight: "Lorem",
  image: "/images/image.png",
  paragraphs: [
    "Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam et faucibus auctor. Curabitur a nisi eu lacus tempor blandit. Integer convallis vehicula nisi, vel tincidunt nunc viverra nec. ",
  ],
  listItems: [
    "Integer convallis vehicula nisi, vel tincidunt nunc viverra nec. ",
    "Integer convallis vehicula nisi, vel tincidunt nunc viverra nec. ",
    "Integer convallis vehicula nisi, vel tincidunt nunc viverra nec. nisi, vel tincidunt nunc viverra nec. ",
  ],
};
