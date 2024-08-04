import { Button } from '@gitanimals/ui-panda';

import LoginButton from '@/components/LoginButton';

import * as styles from './MainSection.style';
import MainSlider from './MainSlider';

function MainSection() {
  return (
    <section className={styles.section}>
      <h1 className={styles.heading}>Have your pet in GITHUB! </h1>
      <p className={styles.desc}>
        You can acquire and grow pets through GitHub activities. Choose from over 50 different pets and raise them.
      </p>
      {/* TODO: button 반응형 처리 */}
      <LoginButton>
        <Button size="m" className="mobile">
          Have Pet
        </Button>
        <Button size="l" className="desktop">
          Have Pet
        </Button>
      </LoginButton>
      <picture className={styles.bg}>
        <source srcSet="/main/section1_bg-mobile.webp" media="(max-width: 768px)" type="image/webp" />
        <img src="/main/section1_bg-pc.webp" alt="section background" />
      </picture>
      <div className={styles.sliderContainer}>
        <MainSlider />
      </div>
    </section>
  );
}

export default MainSection;
