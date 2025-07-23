/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.APP_URL || "https://stalumo.com",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "daily",
  priority: 0.7,
  exclude: ['/secret', '/api/*'],
  additionalSitemaps: [
    `${process.env.APP_URL || 'https://stalumo.com'}/sitemap-blog.xml`,
    `${process.env.APP_URL || 'https://stalumo.com'}/sitemap-city.xml`,
  ],
  alternateRefs: [
    {
      href: `${process.env.APP_URL || 'https://stalumo.com'}/pl`,
      hreflang: "pl",
    },
    {
      href: `${process.env.APP_URL || 'https://stalumo.com'}/en`,
      hreflang: "en",
    },
    {
      href: `${process.env.APP_URL || 'https://stalumo.com'}/de`,
      hreflang: "de",
    },
  ],
};
