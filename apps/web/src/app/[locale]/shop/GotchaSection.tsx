'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { css } from '_panda/css';
import { useQueryClient } from '@tanstack/react-query';
import Lottie from 'lottie-react';

import { useGotcha } from '@/apis/gotcha/useGotcha';
import { USER_QUERY_KEY } from '@/apis/user/useGetUser';
import Congratulations from '@/assets/lottie/congratulations.json';
import { getPersonaImage } from '@/utils/image';

function GotchaSection() {
  const queryClient = useQueryClient();
  const [gotchaVisible, setGotchaVisible] = useState(false);
  const [isBounce, setIsBounce] = useState(false);

  const { mutate, data, isPending } = useGotcha({
    onSuccess: () => {
      setGotchaVisible(true);
      // TODO : 포인트 내려가는 애니매이션을 ㄴ허어볼까
      queryClient.invalidateQueries({
        queryKey: [USER_QUERY_KEY], // TODO: user query key
      });

      const timer = setTimeout(() => {
        setGotchaVisible(false);
        clearTimeout(timer);
      }, 3000);
    },
  });

  const onPress = () => {
    mutate({});
  };

  return (
    <div className={containerStyle}>
      <Image src="/shop/gotcha.svg" width={384} height={80} alt="gotcha" className={gotchaTitleStyle} />
      <Image src="/shop/gotcha-list.png" width={384} height={620} alt="gotcha list" className="gotcha-list" />
      <button className={gotchaPressStyle} onClick={onPress}>
        <Image src="/shop/press.svg" width={384} height={80} alt="press" />
      </button>
      <div className={pointMessageStyle}>
        <Image
          className={'point-message' + (isBounce ? ' bounce' : '')}
          src="/shop/gotcha-point-message.svg"
          width={147}
          height={112}
          alt="gotcha point message"
          onClick={() => setIsBounce(!isBounce)}
        />
      </div>
      {data && gotchaVisible && (
        <>
          <div className={lottieWrapperStyle}>
            <Lottie animationData={Congratulations} loop={false} />;
          </div>
          <div className={gotchaItemStyle}>
            <Image src={getPersonaImage(data.name)} width={180} height={180} alt="persona" className="persona" />
          </div>
        </>
      )}

      {isPending && (
        <div className={loadingWrapperStyle}>
          <Image src="/icon/loading.svg" width={100} height={100} alt="loading" />
        </div>
      )}
    </div>
  );
}

export default GotchaSection;

const pointMessageStyle = css({
  pointerEvents: 'none',
  '& .point-message': {
    position: 'absolute',
    right: '-70px',
    bottom: '26px',
    animation: 'move 1s infinite',
  },

  '& .bounce': {
    animation: 'bounce 1s',
  },
});

const loadingWrapperStyle = css({
  position: 'absolute',
  top: '-4px',
  borderRadius: '16px',
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const lottieWrapperStyle = css({
  position: 'absolute',
  top: 0,
  left: 0,
});

const gotchaItemStyle = css({
  position: 'absolute',
  top: '120px',
  left: '90px',
  animation: 'move_5 0.3s infinite',
});

const containerStyle = css({
  position: 'relative',
  paddingTop: '6px',
  paddingBottom: '6px',
});

const gotchaTitleStyle = css({
  position: 'absolute',
  top: '-6px',
});

const gotchaPressStyle = css({
  position: 'absolute',
  bottom: '-6px',
  left: 0,
  transition: 'all 0.3s',

  _active: {
    transform: 'translateY(4px)',
    filter: 'brightness(0.8)',
  },
});
