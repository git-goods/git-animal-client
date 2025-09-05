import type { MetadataRoute } from 'next';

import { config } from '@/constants/config';
import { LOCALES } from '@/i18n/routing';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = config.url;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: LOCALES.map((locale) => `${baseUrl}/${locale}/sitemap.xml`),
    host: baseUrl,
  };
}
