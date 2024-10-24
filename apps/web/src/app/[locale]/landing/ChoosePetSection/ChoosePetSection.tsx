import { Button } from '@gitanimals/ui-panda';

import { getServerAuth } from '@/auth';
import LoginButton from '@/components/LoginButton';
import { Link } from '@/i18n/routing';

import * as styles from './ChoosePetSection.style';

async function ChoosePetSection() {
  const session = await getServerAuth();
  return (
    <section className={styles.section}>
      <picture className={styles.bg}>
        <source srcSet="/main/choose-pet-bg-mobile.webp" type="image/webp" media="(max-width: 768px)" />
        <img src="/main/choose-pet-bg-pc.webp" alt="Choose from over 50+ different pets and raise them" />
      </picture>
      <h2 className={styles.heading}>
        Choose from <br />
        over 50+ different pets and raise them
      </h2>
      {!session ? (
        <LoginButton>Have Pet</LoginButton>
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
    </section>
  );
}

export default ChoosePetSection;
