import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';

import ClientProvider from '@/components/ClientProvider';
import { GlobalComponent } from '@/components/GlobalComponent';
import Monitoring from '@/components/Monitoring';
import { MONITORING_KEY } from '@/constants/monitoring';

import '@egjs/react-flicking/dist/flicking.css';
import '@egjs/react-flicking/dist/flicking-inline.css';

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
        <GoogleAnalytics gaId={MONITORING_KEY.GA} />
        <GoogleTagManager gtmId={MONITORING_KEY.GTM} />
        <Monitoring />

        <ClientProvider>
          <NextIntlClientProvider messages={messages}>
            {children}

            <GlobalComponent />
          </NextIntlClientProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
