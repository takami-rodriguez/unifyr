import { AuthorDetails } from "@/types/article";

export const authorData: Record<string, AuthorDetails> = {
  brian: {
    _uid: "1B388F26-5707-4E39-AAD4-7872D9585708",
    name: "Brian Carbone",
    image: {
      url: "/images/bchs-circ.webp",
      alt: "Brian Carbone",
      id: "1-author-image",
    },
  },
  businesswire: {
    _uid: "0B388F26-5707-4E39-AAD4-7872D9585708",
    name: "Business Wire",
    image: {
      url: "/images/businesswire.webp",
      alt: "Business Wire",
      id: "2-author-image",
    },
  },
};
