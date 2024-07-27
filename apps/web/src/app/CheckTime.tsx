import React from 'react';
import { css } from '_panda/css';
import { Center } from '_panda/jsx';

const CHECK_DATE = '2024-07-27T22:00:00';

function CheckTime() {
  const isCheckTime = new Date().getTime() < new Date(CHECK_DATE).getTime();
  if (!isCheckTime) return null;

  return (
    <Center
      className={css({
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10000,
        background: '#00894D',
      })}
    >
      <div className={css({ mb: '16px' })}>
        <img src="/main/cats.png" width={216} height={140} alt="cat" />
      </div>

      <h1
        className={css({
          textStyle: 'glyph48.bold',
        })}
      >
        서비스 일시중지 안내
      </h1>
      <p
        className={css({
          margin: '20px 0',
          textStyle: 'glyph24.bold',
          textAlign: 'center',
        })}
      >
        <span className={css({ mb: '8px', display: 'block' })}>
          죄송합니다. <br />
        </span>
        서버 이전작업으로 인한 서비스가 일시 중지 중 이오니 <br />
        점검 시간 이후 이용하여 주시기 바랍니다.
      </p>
      <p
        className={css({
          textStyle: 'glyph24.bold',
          textAlign: 'center',
        })}
      >
        서버 이전 시간 : ~ 7월 27일 22시
      </p>
    </Center>
  );
}

export default CheckTime;
