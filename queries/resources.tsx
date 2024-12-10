import { ArticleTemplateProps, AuthorDetails } from "@/types/article";

const dummyAuthor: AuthorDetails =  {
  _uid: "4-author",
  name: "Brian Carbone",
  image: {
    url: "/images/author1.png",
    alt: "Author",
    id: "1-author-image",
  },
};

const dummyArticlesData: ArticleTemplateProps[] = [
  {
    title: "Lorem ipsum dolor sit amet",
    tags: ["PRM", "SALES", "MARKETING"],
    publishedDate: "2023-12-11",
     featuredImage: {
        url: "/images/image.png",
        alt: "Author",
        id: "1-author-image",
      },
    author: dummyAuthor,
    content:
      "Nam in velit malesuada, porta erat a, vestibulum orci. In ac nibh malesuada, volutpat metus ac, laoreet erat.",
    excerpt:
      "Nam in velit malesuada, porta erat a, vestibulum orci. In ac nibh malesuada, volutpat metus ac, laoreet erat.",
    _uid: "1",
  },
  {
    title: "Lorem ipsum dolor sit amet",
    tags: ["PRM", "SALES", "MARKETING"],
    publishedDate: "2023-12-11",
     featuredImage: {
        url: "/images/image.png",
        alt: "Author",
        id: "1-author-image",
      },
    author: dummyAuthor,
    content:
      "Nam in velit malesuada, porta erat a, vestibulum orci. In ac nibh malesuada, volutpat metus ac, laoreet erat.",
    excerpt:
      "Nam in velit malesuada, porta erat a, vestibulum orci. In ac nibh malesuada, volutpat metus ac, laoreet erat.",
    _uid: "2",
  },
  {
    title: "Lorem ipsum dolor sit amet",
    tags: ["PRM", "SALES", "MARKETING"],
    publishedDate: "2023-12-11",
     featuredImage: {
        url: "/images/image.png",
        alt: "Author",
        id: "1-author-image",
      },
    author: dummyAuthor,
    content:
      "Nam in velit malesuada, porta erat a, vestibulum orci. In ac nibh malesuada, volutpat metus ac, laoreet erat.",
    excerpt:
      "Nam in velit malesuada, porta erat a, vestibulum orci. In ac nibh malesuada, volutpat metus ac, laoreet erat.",
    _uid: "3",
  },
  {
    title: "Lorem ipsum dolor sit amet",
    tags: ["PRM", "SALES", "MARKETING"],
    publishedDate: "2023-12-11",
     featuredImage: {
        url: "/images/image.png",
        alt: "Author",
        id: "1-author-image",
      },
    author: dummyAuthor,
    content:
      "Nam in velit malesuada, porta erat a, vestibulum orci. In ac nibh malesuada, volutpat metus ac, laoreet erat.",
    excerpt:
      "Nam in velit malesuada, porta erat a, vestibulum orci. In ac nibh malesuada, volutpat metus ac, laoreet erat.",
    _uid: "4",
  },
  {
    title: "Article 2",
    tags: ["tag1", "tag2"],
    publishedDate: "2021-08-01",
    content: "Article 2 content",
    excerpt:
      "Nam in velit malesuada, porta erat a, vestibulum orci. In ac nibh malesuada, volutpat metus ac, laoreet erat.",
    _uid: "5",
    author: dummyAuthor,
  },
];

export const fetchAllArticles = async () => {
  return dummyArticlesData;
};


// TODO - Implement the appropriate query function
export const fetchArticleBySlug = async (slug: string) => {
  console.log(slug , "JUST GETTING FIRST DUMMY ARTICLE")
  return dummyArticlesData[0]
}

export const fetchResourcesPageData = async () => {
  return {
    featuredArticle: dummyArticlesData[0],
    banner: {
      title: "Resources",
      button: {
        link: "/#",
        title: "Secondary action",
      },
    },
  };
};
