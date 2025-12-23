import { css } from '_panda/css';

export default function ChristmasGameLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={css({
        backgroundImage: 'url(/game/mini/mw3yfumw3yfumw3y.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100%',
        position: 'relative',
        margin: '0 auto',
        maxWidth: '600px',
        padding: '8px',
        overflow: 'hidden',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
      })}
    >
      <div
        className={css({
          height: '50px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '6px',
          background: 'rgba(139, 69, 19, 0.3)',
          borderRadius: '6px',
          border: '2px solid #FFD700',
          textShadow: '2px 2px 0px #1A0F0A',
          padding: '4px 8px',
          flex: 'none',
        })}
      >
        <h1
          className={css({
            fontSize: { base: '16px', sm: '18px' },
            fontWeight: 'bold',
            color: '#FFFFFF',
            textAlign: 'center',
            lineHeight: '1',
          })}
        >
          🎄 Christmas Memory 🎄
        </h1>
      </div>
      <div
        className={css({
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
        })}
      >
        {children}
      </div>
    </div>
  );
}
