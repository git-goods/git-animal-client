import React from 'react';
import { css } from '_panda/css';

import Slider from '@/components/Slider/ShowOneSlider';

function LandingMainSlider() {
  return (
    <div className={containerStyle}>
      <Slider width="1040px" height="594px">
        {[0, 1, 2].map((idx) => (
          <div key={idx} className={css({ width: '1040px', height: '594px', background: 'yellow' })}>
            {idx}
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default LandingMainSlider;

const containerStyle = css({
  // width: '1040px',
  // height: '594px',
});
