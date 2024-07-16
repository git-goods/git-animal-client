'use client';

import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import Image from 'next/image';
import { css, cx } from '_panda/css';
import { Arrow } from '@egjs/flicking-plugins';
import type { ChangedEvent, FlickingOptions, FlickingProps } from '@egjs/react-flicking';
import Flicking from '@egjs/react-flicking';

// TODO: 후에 공통으로 사용할 수 있을 것 같다.
function AnimalSliderContainer({ children }: { children: React.ReactNode }) {
  const flicking = useRef<Flicking | null>(null);
  // const [plugins, setPlugins] = useState<Plugin[]>([]); // NOTE: 사용한다면 type 유의, fliking type 써야함

  const [currentPanelIndex, setCurrentPanelIndex] = useState(0);

  // const isFirstPanel = currentPanelIndex === 0;
  // const isLastPanel = Children.count(children) - 1 === currentPanelIndex;

  const onPanelChanged = (e: ChangedEvent<Flicking>) => {
    setCurrentPanelIndex(e.index);
  };

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const plugins = [new Arrow({ parentEl: wrapperRef.current })];

  // NOTE: dom 로드 후 플러그인을 넣으면 나을까 싶었음
  // useEffect(() => {
  //   if (!flicking.current) return;
  //   const arrowPlugin = new Arrow({
  //     prevElSelector: '.flicking-arrow-prev',
  //     nextElSelector: '.flicking-arrow-next',
  //   });

  //   setPlugins([arrowPlugin]);
  // }, [flicking]);

  const sliderOptions: Partial<FlickingProps & FlickingOptions> = {
    panelsPerView: 1,
    onChanged: onPanelChanged,
    plugins: isMounted ? plugins : undefined,
  };

  return (
    <div>
      <div ref={wrapperRef} className={sliderContainer}>
        <Flicking ref={flicking} {...sliderOptions}>
          {children}
          {/* <ViewportSlot>
            <span className={cx('flicking-arrow-prev', 'is-outside', sliderArrowStyle, prevArrowStyle)}>
              <Image src="/icon/circle-arrow.svg" alt="arrow" width={40} height={40} />
            </span>
            <span className={cx('flicking-arrow-next', 'is-outside', sliderArrowStyle, nextArrowStyle)}>
              <Image src="/icon/circle-arrow.svg" alt="arrow" width={40} height={40} />
            </span>
          </ViewportSlot> */}
        </Flicking>
        <span className={cx('flicking-arrow-prev', 'is-outside', sliderArrowStyle, prevArrowStyle)}>
          <Image src="/icon/circle-arrow.svg" alt="arrow" width={40} height={40} />
        </span>
        <span className={cx('flicking-arrow-next', 'is-outside', sliderArrowStyle, nextArrowStyle)}>
          <Image src="/icon/circle-arrow.svg" alt="arrow" width={40} height={40} />
        </span>
      </div>
    </div>
  );
}

export default AnimalSliderContainer;

const sliderArrowStyle = css({
  width: '40px',
  backgroundColor: 'yellow',
  position: 'absolute',
  display: 'block',
  height: '40px',
  top: '0',
  bottom: 0,
  margin: 'auto',
  zIndex: 100,

  '&.flicking-arrow-disabled': {
    cursor: 'not-allowed',
    width: '36px',
    height: '36px',
    filter: 'brightness(0.5)',
  },
});

const prevArrowStyle = css({
  rotate: '180deg',
  // left: '-62px',
  transform: 'translateX(40px)',
  _mobile: {
    left: '8px',
  },
});

const nextArrowStyle = css({
  right: '-62px',
  _mobile: {
    right: '8px',
  },
});

const sliderContainer = css({
  position: 'relative',
  width: '100%',
  height: '100%',
  _mobile: {
    width: '100%',
    height: 'auto',
  },
});

// function ArrowButton({
//   onClick,
//   direction,
//   disabled,
// }: {
//   onClick: () => void;
//   direction: 'prev' | 'next';
//   disabled: boolean;
// }) {
//   return (
//     <button
//       onClick={onClick}
//       className={cx(
//         direction === 'prev' ? prevArrowStyle : nextArrowStyle,
//         css({
//           rotate: direction === 'prev' ? '180deg' : '0deg',
//           cursor: disabled ? 'not-allowed' : 'pointer',
//           width: disabled ? '36px' : '40px',
//           height: disabled ? '36px' : '40px',
//           _mobile: {
//             width: disabled ? '24px' : '26px',
//             height: disabled ? '24px' : '26px',
//           },
//         }),
//       )}
//     >
//       {disabled ? (
//         <Image src="/icon/circle-arrow-disable.svg" alt="arrow" width={36} height={36} />
//       ) : (
//         <Image src="/icon/circle-arrow.svg" alt="arrow" width={40} height={40} />
//       )}
//     </button>
//   );
// }

// const arrowStyle = css({
//   position: 'absolute',
//   top: '0',
//   bottom: '0',
//   margin: 'auto',
//   zIndex: '2', // TODO : zIndex theme 적용

//   '& img': {
//     width: '100%',
//     height: '100%',
//   },

//   _mobile: {
//     bottom: '191px',
//   },
// });

// // const prevArrowStyle = cx(
// //   arrowStyle,
// //   css({
// //     left: '-62px',
// //     _mobile: {
// //       left: '8px',
// //     },
// //   }),
// // );

// const nextArrowStyle = cx(
//   arrowStyle,
//   css({
//     right: '-62px',
//     _mobile: {
//       right: '8px',
//     },
//   }),
// );
