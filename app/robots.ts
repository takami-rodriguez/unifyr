import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const url = new URL(process.env.URL!);

  const userAgent = "*";
  const sitemap = new URL("sitemap.xml", url).href;

  if (url.host.startsWith("www.")) {
    return {
      rules: {
        userAgent,
        allow: "/",
      },
      sitemap,
    };
  } else {
    return {
      rules: {
        userAgent,
        disallow: "/",
      },
      sitemap,
    };
  }
}
