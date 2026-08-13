import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Replace this with your actual production domain if it's not seek-on.app
  const baseUrl = 'https://seek-on.app';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    // If you add more pages later (e.g., /about, /contact), 
    // you can add them to this array like so:
    // {
    //   url: `${baseUrl}/about`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
  ];
}
