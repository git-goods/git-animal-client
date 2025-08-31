import { css } from '_panda/css';

export function ErrorSection(props: { title: string; description: string }) {
  return (
    <div
      className={css({
        bg: 'gray.900',
        display: 'flex',
        flexDir: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: '8',
        position: 'relative',
        overflow: 'hidden',
        gap: '4',
      })}
    >
      {/* 배경 패턴 효과 */}
      <div
        className={css({
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          height: '50%',
          bg: 'gray.800',
          opacity: '0.3',
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)',
          backgroundSize: '20px 20px',
        })}
      />

      {/* 메인 제목 */}
      <h2
        className={css({
          color: 'white',
          textStyle: 'glyph24.regular',
          textAlign: 'center',
          position: 'relative',
          zIndex: '1',
        })}
      >
        {props.title}
      </h2>
      <p
        className={css({
          color: 'gray.400',
          textStyle: 'glyph16.regular',
          textAlign: 'center',
          position: 'relative',
          zIndex: '1',
        })}
      >
        {props.description}
      </p>
    </div>
  );
}
