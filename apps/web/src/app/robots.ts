import type { MetadataRoute } from 'next';

import { config } from '@/shared/config/config';
import { LOCALE_LIST } from '@/shared/i18n/routing';

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
