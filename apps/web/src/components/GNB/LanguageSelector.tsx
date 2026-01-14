'use client';

import React, { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@gitanimals/ui-tailwind';
import { RadioButtonOff, RadioButtonOn } from '@gitanimals/ui-icon';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, Globe } from 'lucide-react';

import { Link, type Locale, usePathname } from '@/i18n/routing';

const LOCALE_MAP: Record<Locale, string> = {
  en_US: 'English',
  ko_KR: '한국어',
};

export const DesktopLanguageSelector = () => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button onClick={() => setIsOpen(!isOpen)}>
        <Globe size={24} color="#000000BF" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'absolute -right-10 mt-1 bg-white rounded-md overflow-hidden min-w-[100px] w-full z-dropdown',
              'shadow-[0px_3px_5px_2px_rgba(0,0,0,0.25)] py-2',
              '[&_.option]:w-full [&_.option]:text-center [&_.option]:px-4 [&_.option]:py-2',
              '[&_.option]:transition-colors [&_.option]:text-black [&_.option]:whitespace-nowrap',
              '[&_.option]:font-product [&_.option]:text-glyph-16 [&_.option:hover]:underline'
            )}
          >
            {Object.keys(LOCALE_MAP).map((lang) => (
              <Link href={pathname} key={lang} locale={lang as Locale} passHref>
                <motion.button key={lang} onClick={() => setIsOpen(false)} className="option">
                  {LOCALE_MAP[lang as Locale]}
                </motion.button>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function MobileLanguageSelector({ onBack }: { onBack: () => void }) {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('Layout');

  return (
    <article className="fixed inset-0 bg-white max-h-screen overflow-y-auto z-drawer">
      <div
        className={cn(
          'px-4 font-product text-glyph-18 flex items-center justify-between relative w-full h-11',
          '[&_.center-title]:w-fit [&_.center-title]:absolute [&_.center-title]:left-1/2 [&_.center-title]:-translate-x-1/2'
        )}
      >
        <button onClick={onBack}>
          <ChevronLeft size={24} color="#9295A1" />
        </button>

        <div className="center-title">{t('language')}</div>
      </div>
      <ul
        className={cn(
          'w-full font-product text-glyph-16',
          '[&_li]:flex [&_li]:items-center [&_li]:justify-between',
          '[&_li]:py-[18px] [&_li]:pr-[22px] [&_li]:pl-5',
          '[&_li]:border-b [&_li]:border-gray-900 [&_li]:bg-white'
        )}
      >
        {Object.keys(LOCALE_MAP).map((lang) => (
          <Link href={pathname} key={lang} locale={lang as Locale}>
            <li key={lang}>
              <div className="label">{LOCALE_MAP[lang as Locale]}</div>
              <div>{locale === lang ? <RadioButtonOn /> : <RadioButtonOff />}</div>
            </li>
          </Link>
        ))}
      </ul>
    </article>
  );
}
