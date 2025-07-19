import type { MetadataRoute } from 'next';

import { config } from '@/constants/config';
import { LOCALES } from '@/i18n/routing';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = config.url;

  const staticPages = [
    '', // 홈페이지
    '/mypage',
    '/guild',
    '/shop',
    '/event',
  ];

  // 각 로케일별로 정적 페이지 URL 생성
  const staticRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    })),
  );

  // 마이페이지 탭 URL 생성
  const mypageTabs = ['line-type', 'farm-type'];
  const mypageRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    mypageTabs.map((tab) => ({
      url: `${baseUrl}/${locale}/mypage?type=${tab}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    })),
  );

  return [...staticRoutes, ...mypageRoutes];
}
