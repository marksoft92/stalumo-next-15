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
    ],
    alternateRefs: [
        {
            href: "https://stalumo.com/pl",
            hreflang: "pl",
        },
        {
            href: "https://stalumo.com/en",
            hreflang: "en",
        },
        {
            href: "https://stalumo.com/en",
            hreflang: "de",
        },
    ],
};
