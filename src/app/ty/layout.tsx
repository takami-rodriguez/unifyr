import Testimonial from "@/components/testimonial";
import LatestArticles from "../blog/components/latestArticles";
import { fetchAllArticles } from "@/queries/blog";

const TYLayout = async ({ children }: React.PropsWithChildren) => {
  const articles = await fetchAllArticles();
  return (
    <main className="pb-24 md:pb-20">
      {children}
      <div className="mx-auto mt-10 max-w-5xl lg:mt-20">
        {articles && <LatestArticles articles={articles} />}
      </div>
    </main>
  );
};

export default TYLayout;
