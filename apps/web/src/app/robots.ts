import type { MetadataRoute } from 'next';

import { config } from '@/constants/config';
import { LOCALE_LIST } from '@/i18n/routing';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = config.url;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: LOCALE_LIST.map((locale) => `${baseUrl}/${locale}/sitemap.xml`),
    host: baseUrl,
  };
}
