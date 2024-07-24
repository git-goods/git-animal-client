import * as styles from './ChoosePetSection.style';
import { Button } from '@gitanimals/ui-panda';
import LoginButton from '@/components/LoginButton';

function ChoosePetSection() {
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
      <LoginButton>
        <Button className="desktop" size="l">
          Have Pet
        </Button>
        <Button className="mobile" size="m">
          Have Pet
        </Button>
      </LoginButton>
    </section>
  );
}

export default ChoosePetSection;
