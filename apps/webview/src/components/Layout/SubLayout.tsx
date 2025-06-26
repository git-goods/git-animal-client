import { css } from '_panda/css';

export const SubLayout = ({ children, title }: { children: React.ReactNode; title: string }) => {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        backgroundColor: 'black',
        padding: '16px',
        minHeight: '100vh',
        maxW: '560px',
        mx: 'auto',
        color: 'white',
      })}
    >
      <div
        className={css({
          position: 'fixed',
          height: 'var(--mobile-sub-header-height)',
          width: '100%',
          zIndex: 100,
          top: 0,
          left: 0,
          right: 0,
        })}
      >
        <h1
          className={css({
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'white',
          })}
        >
          {title}
        </h1>
      </div>
      {children}
    </div>
  );
};

export function BottomButton({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div
        className={css({
          position: 'fixed',
          bottom: '-34px',
          zIndex: 99,
          left: 0,
          pointerEvents: 'none',
          right: 0,
          bg: 'linear-gradient(180deg, rgba(24, 26, 29, 0) 0%, #181A1D 50%)',
          height: '160px',
        })}
      />
      <div
        className={css({
          position: 'fixed',
          bottom: 0,
          width: '100%',
          zIndex: 100,
          px: 4,
          py: 2,
          left: 0,
          right: 0,
        })}
      >
        {children}
      </div>
    </div>
  );
}
