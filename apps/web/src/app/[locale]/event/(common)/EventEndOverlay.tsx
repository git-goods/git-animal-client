import { useTranslations } from 'next-intl';

export function EventEndOverlay() {
  const t = useTranslations('Event');

  return (
    <div className="bg-black/80 fixed top-0 left-0 w-full h-full flex justify-center items-center z-overlay overflow-hidden">
      <h1 className="text-white text-center font-product text-glyph-32 font-bold">{t('event-end')}</h1>
    </div>
  );
}
