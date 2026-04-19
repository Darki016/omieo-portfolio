export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://omieo-portfolio.vercel.app/sitemap.xml",
  };
}
