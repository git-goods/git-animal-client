import { Button } from '@gitanimals/ui-panda';

import { getServerAuth } from '@/auth';
import { LoginButton } from '@/components/AuthButton';
import { Link } from '@/i18n/routing';

import * as styles from './MainSection.style';
import MainSlider from './MainSlider';
import { TopBanner } from './TopBanner';

async function MainSection() {
  const session = await getServerAuth();
  return (
    <section className={styles.section}>
      <TopBanner />
      <h1 className={styles.heading}>Have your pet in GITHUB! </h1>
      <p className={styles.desc}>
        You can acquire and grow pets through GitHub activities. Choose from over 50 different pets and raise them.
      </p>
      {/* TODO: button 반응형 처리 */}
      {!session ? (
        <LoginButton label="Have Pet" />
      ) : (
        <Link href="/mypage">
          <Button className="desktop" size="l">
            Go To Mypage
          </Button>
          <Button className="mobile" size="m">
            Go To Mypage
          </Button>
        </Link>
      )}
      <div className={styles.bg} />
      <div className={styles.sliderContainer}>
        <MainSlider />
      </div>
    </section>
  );
}

export default MainSection;
