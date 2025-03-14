import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { ClientProvider, GlobalComponent, Monitoring } from '@/components/Global';
import PWAGuide from '@/components/PWAInstallBanner';

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
        <Monitoring />

        <ClientProvider>
          <NextIntlClientProvider messages={messages}>
            {children}

            <GlobalComponent />
            <PWAGuide />
          </NextIntlClientProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
