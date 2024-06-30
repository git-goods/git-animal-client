import React from 'react';
import { css } from '_panda/css';

import Slider from '@/components/Slider/ShowOneSlider';

function LandingMainSlider() {
  return (
    <Slider width="1040px" height="594px">
      {[0, 1, 2].map((idx) => (
        <div key={idx} className={css({ width: '1040px', height: '594px' })}>
          {idx}
        </div>
      ))}
    </Slider>
  );
}

export default LandingMainSlider;
