'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { RadioButtonOff, RadioButtonOn } from '@gitanimals/ui-icon';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, Globe } from 'lucide-react';

import { Link, type Locale, usePathname } from '@/i18n/routing';
import { useTypedLocale } from '@/i18n/useTypedLocale';

const LOCALE_MAP: Record<Locale, string> = {
  'en-US': 'English',
  'ko-KR': '한국어',
};

const dropdownClass =
  'absolute right-[-40px] mt-[4px] w-full min-w-[100px] overflow-hidden rounded-[6px] bg-white py-[8px] shadow-[0px_3px_5px_2px_rgba(0,0,0,0.25)] z-dropdown';
const optionClass =
  'glyph16-regular w-full whitespace-nowrap px-[16px] py-[8px] text-center text-black transition-colors duration-200 hover:underline';

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
            className={dropdownClass}
          >
            {Object.keys(LOCALE_MAP).map((lang) => (
              <Link href={pathname} key={lang} locale={lang as Locale} passHref>
                <motion.button key={lang} onClick={() => setIsOpen(false)} className={optionClass}>
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
  const locale = useTypedLocale();
  const t = useTranslations('Layout');

  return (
    <article className="fixed inset-0 z-drawer max-h-screen overflow-y-auto bg-white">
      <div className="glyph18-regular relative flex h-[44px] w-full items-center justify-between px-[16px]">
        <button onClick={onBack}>
          <ChevronLeft size={24} color="#9295A1" />
        </button>

        <div className="absolute left-1/2 w-fit -translate-x-1/2">{t('language')}</div>
      </div>
      <ul className="glyph16-regular w-full [&_li]:flex [&_li]:items-center [&_li]:justify-between [&_li]:border-b [&_li]:border-gray-900 [&_li]:bg-white [&_li]:pb-[18px] [&_li]:pl-[20px] [&_li]:pr-[22px] [&_li]:pt-[18px]">
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
