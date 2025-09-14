import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/admin", "/login"]
        },
        sitemap: "https://k-mobile-massage.com/sitemap.xml",
    };
}