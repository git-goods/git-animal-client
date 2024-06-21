import React, { useState } from 'react';
import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';
import Lottie from 'lottie-react';
import styled from 'styled-components';

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
    <Container>
      <Image src="/shop/gotcha.svg" width={384} height={80} alt="gotcha" className="gotcha-title" />
      <Image src="/shop/gotcha-list.png" width={384} height={620} alt="gotcha list" className="gotcha-list" />
      <button className="gotcha-press" onClick={onPress}>
        <Image src="/shop/press.svg" width={384} height={80} alt="press" />
      </button>
      <PointMessage>
        <Image
          className={'point-message' + (isBounce ? ' bounce' : '')}
          src="/shop/gotcha-point-message.svg"
          width={147}
          height={112}
          alt="gotcha point message"
          onClick={() => setIsBounce(!isBounce)}
        />
      </PointMessage>
      {data && gotchaVisible && (
        <>
          <LottieWrapper>
            <Lottie animationData={Congratulations} loop={false} />;
          </LottieWrapper>
          <GotchaItem>
            <Image src={getPersonaImage(data.name)} width={180} height={180} alt="persona" className="persona" />
          </GotchaItem>
        </>
      )}

      {isPending && (
        <LoadingWrapper>
          <Image src="/icon/loading.svg" width={100} height={100} alt="loading" />
        </LoadingWrapper>
      )}
    </Container>
  );
}

export default GotchaSection;

const PointMessage = styled.div`
  pointer-events: none;
  .point-message {
    position: absolute;
    right: -70px;
    bottom: 26px;
    animation: move 1s infinite;

    @keyframes move {
      0% {
        rotate: -2deg;
      }
      50% {
        rotate: 2deg;
      }
      100% {
        rotate: -2deg;
      }
    }
  }

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-30px);
    }
    60% {
      transform: translateY(-20px);
    }
  }

  &.bounce {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-name: bounce;
    animation-name: bounce;
  }
`;
const LoadingWrapper = styled.div`
  position: absolute;
  top: -4px;
  border-radius: 16px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const LottieWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

const GotchaItem = styled.div`
  position: absolute;
  top: 120px;
  left: 90px;

  animation: move 0.3s infinite;
  -webkit-animation: move 0.3s infinite;

  @keyframes move {
    0% {
      transform: translateY(0);
      rotate: -5deg;
    }
    50% {
      transform: translateY(0);
      rotate: 5deg;
    }
    100% {
      transform: translateY(0);
      rotate: -5deg;
    }
  }
`;

const Container = styled.section`
  position: relative;
  padding-top: 6px;
  padding-bottom: 6px;
  .gotcha-title {
    position: absolute;
    top: -6px;
  }

  .gotcha-press {
    position: absolute;
    bottom: -6px;
    left: 0;
    transition: all 0.3s;

    &:active {
      transform: translateY(4px);
      filter: brightness(0.8);
    }
  }
`;
