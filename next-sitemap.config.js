/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.APP_URL || "https://stalumo.com",
    generateRobotsTxt: true,
    sitemapSize: 7000,
    changefreq: "daily",
    priority: 0.7,
    exclude: ['/secret', '/api/*'],
    additionalSitemaps: [
        `${process.env.APP_URL || 'https://stalumo.com/'}sitemap-blog.xml`,
    ],
    alternateRefs: [
        {
            href: `${process.env.APP_URL}pl`,
            hreflang: "pl",
        },
        {
            href: `${process.env.APP_URL}en`,
            hreflang: "en",
        },
        {
            href: `${process.env.APP_URL}de`,
            hreflang: "de",
        },
    ],
};
