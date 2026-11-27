import { JetBrains_Mono } from 'next/font/google';
import { getTranslations } from 'next-intl/server';

import { getServerAuth } from '@/auth';

import { AsciiCta } from './AsciiCta';
import { AsciiLogo } from './AsciiLogo';
import { AsciiTree } from './AsciiTree';

const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['500', '700'], display: 'swap' });

const QR_LINK = 'https://www.gitanimals.org';

export async function ChristmasAsciiContent() {
  const [session, t] = await Promise.all([getServerAuth(), getTranslations('Landing')]);
  const isAuth = Boolean(session);

  return (
    <section
      className={`${mono.className} relative h-[calc(100vh-60px)] [font-variant-ligatures:none] min-h-[560px] overflow-hidden bg-gray-000 mobile:h-[100dvh]`}
    >
      <AsciiTree link={QR_LINK} hintToQr={t('christmas-hint-qr')} hintToTree={t('christmas-hint-tree')} />

      <div className="pointer-events-none absolute left-[max(48px,calc((100vw-1320px)/2+48px))] top-[calc(50%+30px)] z-[2] w-[min(42vw,600px)] -translate-y-1/2 mobile:bottom-[14vh] mobile:left-[16px] mobile:right-[16px] mobile:top-[56px] mobile:flex mobile:w-auto mobile:translate-y-0 mobile:flex-col mobile:items-center mobile:text-center">
        <AsciiLogo className="max-w-[680px] mobile:mx-auto mobile:max-w-[min(92vw,420px)]" />
        <p className="mb-[40px] mt-[32px] whitespace-pre text-[22px] font-medium leading-[1.6] text-white-alpha-90 [text-shadow:0_0_10px_rgba(255,255,255,0.25)] mobile:mb-0 mobile:mt-[16px] mobile:text-[13px]">
          {`> ${t('christmas-line1')}\n> ${t('christmas-line2')}`}
          <span className="animate-[blink_1s_steps(1)_infinite] motion-reduce:animate-none">_</span>
        </p>
        <div className="mobile:mt-auto">
          <AsciiCta isAuth={isAuth} label={isAuth ? t('christmas-go-mypage') : t('christmas-login')} />
        </div>
      </div>

      <p className="absolute bottom-[16px] left-[20px] z-[2] text-[12px] text-white-alpha-50 mobile:bottom-[12px] mobile:left-1/2 mobile:-translate-x-1/2">
        tree by{' '}
        <a
          href="https://www.instagram.com/catherinee.md"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          catherinee.md
        </a>
      </p>
    </section>
  );
}
