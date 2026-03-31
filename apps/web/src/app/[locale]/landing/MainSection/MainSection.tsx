import { Button } from '@gitanimals/ui-tailwind';

import { getServerAuth } from '@/shared/api/auth';
import { LoginButton } from '@/components/AuthButton';
import { Responsive } from '@/components/Responsive';
import { Link } from '@/shared/i18n/routing';

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
      {!session ? (
        <LoginButton label="Get a Pet" />
      ) : (
        <Link href="/mypage">
          <Responsive component={Button} desktop={{ size: 'l' }} mobile={{ size: 'm' }}>
            Go To Mypage
          </Responsive>
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
