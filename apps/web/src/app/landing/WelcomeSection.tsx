import React from 'react';
import { css } from '_panda/css';
import { Button } from '@gitanimals/ui-panda';

function WelcomeSection() {
  return (
    <section className={sectionStyle}>
      <h1 className={headingStyle}>Have your pet in GITHUB! </h1>
      <p className={descStyle}>
        You can acquire and grow pets through GitHub activities. Choose from over 50 different pets and raise them.
      </p>
      <Button size="l">Have Pet</Button>
    </section>
  );
}

export default WelcomeSection;
const sectionStyle = css({
  paddingTop: '120px',
  textAlign: 'center',
});

const headingStyle = css({
  textStyle: 'glyph82.bold',
  maxWidth: '500px',
  color: 'white',
});

const descStyle = css({
  textStyle: 'glyph24.regular',
  color: 'white',
});
