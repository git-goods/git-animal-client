import { useTranslations } from 'next-intl';
import { css } from '_panda/css';

export function EventEndOverlay() {
  const t = useTranslations('Event');

  return (
    <div
      className={css({
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 'overlay',
        overflow: 'hidden',
      })}
    >
      <h1
        className={css({
          color: 'white',
          textAlign: 'center',
          textStyle: 'glyph32.bold',
        })}
      >
        {t('event-end')}
      </h1>
    </div>
  );
}
