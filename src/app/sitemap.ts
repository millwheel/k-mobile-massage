import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://k-mobilemassage.com/",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        }
    ];
}