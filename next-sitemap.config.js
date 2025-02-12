const siteUrl = process.env.NEXT_PUBLIC_URL;

/** @type {import('next-sitemap').IRobotPolicy} */
const policy = siteUrl.startsWith("https://www.")
  ? { userAgent: "*", allow: "/" }
  : { userAgent: "*", disallow: "/" };

/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl,
  output: "export",
  trailingSlash: true,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [policy],
  },
}
