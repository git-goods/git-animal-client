import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

import { sendLog } from '@/utils/log';

import { routing } from './routing';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as any)) notFound();

  try {
    // Attempt to dynamically import the locale messages
    const messages = (await import(`../../messages/${locale}.json`)).default;
    return { messages };
  } catch (error) {
    sendLog({ locale: locale, error: 'Error loading messages for locale' }, 'Error loading messages for locale');
    // Log the error for debugging purposes
    console.error(`Error loading messages for locale: ${locale}`, error);
    notFound(); // Optionally, you can return a 404 if the file is missing
  }
});
