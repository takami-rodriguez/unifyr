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
  title: "Successful partner channel programs start here",
  titleHighlight: "start",
  image: "/images/home/carousel/supplier.webp",
  paragraphs: [
    "The orchestration of partner ecosystems is cornerstone to the  largest and most successful businesses, but reaching channel  operations maturity doesn’t happen overnight.",
    " Partners require intelligent tools to manage multiple supplier relationships and maximize workflow efficiency. Unifyr offers the industry-leading solutions to the toughest channel problems.",
  ],
  listItems: [
    "ZiftONE provides suppliers with PRM, TCMA, and LMS built to scale.",
    "Unifyr+ helps partners manage many suppliers and stay atop them all.",
    "Unifyr Pro gives agencies a marketplace to find business in the channel.",
  ],
};
