import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import ClientProvider from '@/app/[locale]/_components/ClientProvider';
import GlobalOverlay from '@/app/[locale]/_components/GlobalOverlay';
import Monitoring from '@/app/[locale]/_components/Monitoring';
import { config } from '@/shared/config/config';
import type { Locale } from '@/shared/i18n/routing';
import { LOCALE_LIST } from '@/shared/i18n/routing';

export function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Metadata {
  const baseUrl = config.url;

  return {
    title: {
      template: '%s | GitAnimals',
      default: 'GitAnimals',
    },
    other: {
      'naver-site-verification': config.naver.siteVerification,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: Object.fromEntries(LOCALE_LIST.map((loc) => [loc, `${baseUrl}/${loc}`])),
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <Monitoring />

        <NextIntlClientProvider messages={messages}>
          <NuqsAdapter>
            <ClientProvider>
              {children}

              <GlobalOverlay />
            </ClientProvider>
          </NuqsAdapter>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
