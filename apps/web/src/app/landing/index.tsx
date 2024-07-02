import React from 'react';
import { css } from '_panda/css';

import LandingMainSlider from './MainSlider';

function Landing() {
  return (
    <div className={containerStyle}>
      <LandingMainSlider />
    </div>
  );
}

export default Landing;

const containerStyle = css({
  paddingTop: '100px',
});
