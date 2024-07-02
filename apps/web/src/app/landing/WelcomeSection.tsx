import React from 'react';
import { css } from '_panda/css';
import { flex } from '_panda/patterns';
import { Button } from '@gitanimals/ui-panda';

import LandingMainSlider from './MainSlider';

function WelcomeSection() {
  return (
    <section className={sectionStyle}>
      <h1 className={headingStyle}>Have your pet in GITHUB! </h1>
      <p className={descStyle}>
        You can acquire and grow pets through GitHub activities. Choose from over 50 different pets and raise them.
      </p>
      {/* TODO: button 반응형 처리 */}
      <Button size="m" className="mobile">
        Have Pet
      </Button>
      <Button size="l" className="desktop">
        Have Pet
      </Button>
      <picture className={bgStyle}>
        <source srcSet="/main/section1_bg-mobile.png" media="(max-width: 768px)" type="image/png" />
        <source srcSet="/main/section1_bg-pc.png" type="image/png" />
        <img src="/main/section1_bg-pc.png" alt="section background" />
      </picture>
      <div className={sliderContainerStyle}>
        <LandingMainSlider />
      </div>
    </section>
  );
}

export default WelcomeSection;

const sectionStyle = flex({
  paddingTop: '120px',
  paddingBottom: '120px',
  textAlign: 'center',
  position: 'relative',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  _mobile: {
    padding: '80px 12px',
  },

  '& .mobile': {
    display: 'none',
    _mobile: {
      display: 'block',
    },
  },

  '& .desktop': {
    display: 'block',
    _mobile: {
      display: 'none',
    },
  },
});

const headingStyle = css({
  textStyle: 'glyph82.bold',
  maxWidth: '800px',
  color: 'white',

  _mobile: {
    textStyle: 'glyph40.bold',
  },
});

const descStyle = css({
  textStyle: 'glyph24.regular',
  maxWidth: '600px',
  color: 'white',
  marginTop: '16px',
  marginBottom: '40px',
  _mobile: {
    textStyle: 'glyph16.regular',
    marginBottom: '20px',
    marginTop: '20px',
  },
});

const bgStyle = css({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
  zIndex: -1,
  width: '100%',
  height: '100%',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

const sliderContainerStyle = css({
  marginTop: '80px',
});
