export type LandingPageProps = {
  formId: string;
  title: string;
  titleHighlight: string;
  image: string;
  paragraphs: string[];
  listItems: string[];
};

export const g2Data: LandingPageProps = {
  formId: "1862",
  title: "ZiftONE leads PRM innovation since 2006",
  titleHighlight: "innovation",
  image: "/images/home/features/ziftone.webp",
  paragraphs: [
    "ZiftONE is the only PRM solution with bespoke implementations and deeply integrated, privacy-first AI features designed to propel your business toward channel success now and ever forward as you grow and scale.",
  ],
  listItems: [
    "A partner portal built for your channel partnership requirements.",
    "Bespoke integrations with the tools you already use or plan to use.",
    "Support to succeed in the channel independent of size.",
  ],
};
