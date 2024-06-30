import { css } from '_panda/css';

import LandingMainSlider from './landing/MainSlider';

import '@egjs/react-flicking/dist/flicking.css';
import '@egjs/react-flicking/dist/flicking-inline.css';

export default function Home() {
  return (
    <div>
      <section className={modeDemoSectionStyle}>
        <LandingMainSlider />
      </section>
    </div>
  );
}

const modeDemoSectionStyle = css({
  backgroundColor: 'brand.green',
});
