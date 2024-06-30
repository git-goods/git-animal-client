import type { PropsWithChildren } from 'react';
import { Children, useRef } from 'react';
import { css, cx } from '_panda/css';
import Flicking from '@egjs/react-flicking';

import '@egjs/react-flicking/dist/flicking.css';
import '@egjs/react-flicking/dist/flicking-inline.css';

interface ShowOneSliderProps {
  width: string;
  height: string;
}

function ShowOneSlider(props: PropsWithChildren<ShowOneSliderProps>) {
  const flicking = useRef<Flicking | null>(null);

  const moveToNextPanel = async () => {
    if (!flicking.current) return;

    try {
      flicking.current.next();
    } catch (error) {}
  };

  const moveToPrevPanel = async () => {
    if (!flicking.current) return;
    try {
      flicking.current.prev();
    } catch (error) {}
  };

  return (
    <div className={containerStyle}>
      <button onClick={moveToPrevPanel} style={{ rotate: '180deg' }} className={prevArrowStyle}>
        <ActiveArrow />
      </button>
      <button onClick={moveToNextPanel} className={nextArrowStyle}>
        <ActiveArrow />
      </button>
      <div
        className={cx(
          sliderContainerStyle,
          css({
            width: props.width,
            height: props.height,
          }),
        )}
      >
        <Flicking ref={flicking} circular={true}>
          {Children.map(props.children, (child, idx) => (
            <div className={cx('panel', panelStyle)} key={idx}>
              {child}
            </div>
          ))}
        </Flicking>
      </div>
    </div>
  );
}

export default ShowOneSlider;

const sliderContainerStyle = css({
  overflow: 'hidden',
});

const arrowStyle = css({
  position: 'absolute',
  top: '0',
  bottom: '0',
  margin: 'auto',
});

const prevArrowStyle = cx(
  arrowStyle,
  css({
    left: '-22px',
  }),
);

const nextArrowStyle = cx(
  arrowStyle,
  css({
    right: '-22px',
  }),
);
const containerStyle = css({
  position: 'relative',
  width: 'fit-content',
  height: 'fit-content',
});

const panelStyle = css({
  backgroundColor: 'black',
  color: 'white',
  width: 'fit-content',
  height: 'fit-content',
  //   '& img': {
  //     width: '100%',
  //     height: '100%',
  //     objectFit: 'cover',
  //   },
});

function ActiveArrow() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="20" fill="white" />
      <rect x="0.5" y="0.5" width="39" height="39" rx="19.5" stroke="black" stroke-opacity="0.1" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.8675 18.7996H25.9035L20.4525 13.3486C19.9835 12.8796 19.9835 12.1196 20.4525 11.6516C20.9215 11.1826 21.6805 11.1826 22.1495 11.6516L29.6495 19.1516C29.6525 19.1536 29.6535 19.1576 29.6565 19.1606C29.7635 19.2696 29.8495 19.3986 29.9085 19.5406C30.0305 19.8346 30.0305 20.1646 29.9085 20.4586C29.8495 20.6016 29.7635 20.7296 29.6565 20.8386C29.6535 20.8416 29.6525 20.8456 29.6495 20.8486L22.1495 28.3486C21.9155 28.5826 21.6085 28.6996 21.3015 28.6996C20.9935 28.6996 20.6865 28.5826 20.4525 28.3486C19.9835 27.8796 19.9835 27.1196 20.4525 26.6516L25.9035 21.1996H11.8675C11.2045 21.1996 10.6675 20.6626 10.6675 19.9996C10.6675 19.3376 11.2045 18.7996 11.8675 18.7996Z"
        fill="black"
      />
    </svg>
  );
}

function DisableArrow() {
  return (
    <svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.5">
        <rect y="0.799805" width="36" height="36" rx="18" fill="white" />
        <rect
          x="0.45"
          y="1.2498"
          width="35.1"
          height="35.1"
          rx="17.55"
          stroke="black"
          stroke-opacity="0.1"
          stroke-width="0.9"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10.6807 17.7195H23.3132L18.4073 12.8136C17.9852 12.3915 17.9852 11.7075 18.4073 11.2863C18.8294 10.8642 19.5125 10.8642 19.9346 11.2863L26.6846 18.0363C26.6873 18.0381 26.6882 18.0417 26.6909 18.0444C26.7872 18.1425 26.8646 18.2586 26.9176 18.3864C27.0275 18.651 27.0275 18.948 26.9176 19.2126C26.8646 19.3413 26.7872 19.4565 26.6909 19.5546C26.6882 19.5573 26.6873 19.5609 26.6846 19.5636L19.9346 26.3136C19.7239 26.5242 19.4477 26.6295 19.1714 26.6295C18.8942 26.6295 18.6179 26.5242 18.4073 26.3136C17.9852 25.8915 17.9852 25.2075 18.4073 24.7863L23.3132 19.8795H10.6807C10.0841 19.8795 9.60075 19.3962 9.60075 18.7995C9.60075 18.2037 10.0841 17.7195 10.6807 17.7195Z"
          fill="black"
        />
      </g>
    </svg>
  );
}
