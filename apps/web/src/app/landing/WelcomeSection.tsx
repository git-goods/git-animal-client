import React from 'react';
import { css } from '_panda/css';
import { flex } from '_panda/patterns';
import { Button } from '@gitanimals/ui-panda';

function WelcomeSection() {
  return (
    <section className={sectionStyle}>
      <h1 className={headingStyle}>Have your pet in GITHUB! </h1>
      <p className={descStyle}>
        You can acquire and grow pets through GitHub activities. Choose from over 50 different pets and raise them.
      </p>
      <Button size="l">Have Pet</Button>
      <picture className={bgStyle}>
        <source srcSet="/main/section1_bg-mobile.png" media="(max-width: 768px)" type="image/png" />
        <source srcSet="/main/section1_bg-pc.png" type="image/png" />
        <img src="/main/section1_bg-pc.png" alt="section background" />
      </picture>
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
});

const headingStyle = css({
  textStyle: 'glyph82.bold',
  maxWidth: '800px',
  color: 'white',
});

const descStyle = css({
  textStyle: 'glyph24.regular',
  maxWidth: '600px',
  color: 'white',
  marginTop: '16px',
  marginBottom: '40px',
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
