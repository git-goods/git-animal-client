import { Button } from '@gitanimals/ui-tailwind';

import { getServerAuth } from '@/auth';
import { LoginButton } from '@/components/AuthButton';
import { Responsive } from '@/components/Responsive';
import { Link } from '@/i18n/routing';

const styles = {
  section:
    'flex items-center justify-center relative py-[120px] overflow-hidden flex-col gap-[60px] mobile:py-[80px] mobile:px-[16px] mobile:gap-[20px]',
  bg: 'absolute top-0 bottom-0 right-0 left-0 z-hide',
  bgImg: 'w-full h-full object-cover',
  heading: 'glyph82-bold text-white text-center max-w-[840px] mobile:glyph40-bold',
};

async function ChoosePetSection() {
  const session = await getServerAuth();
  return (
    <section className={styles.section}>
      <picture className={styles.bg}>
        <source srcSet="/main/choose-pet-bg-mobile.webp" type="image/webp" media="(max-width: 768px)" />
        <img
          className={styles.bgImg}
          src="/main/choose-pet-bg-pc.webp"
          alt="Choose from over 50+ different pets and raise them"
        />
      </picture>
      <h2 className={styles.heading}>
        Choose from <br />
        over 50+ different pets and raise them
      </h2>
      {!session ? (
        <LoginButton label="Get a Pet" />
      ) : (
        <Link href="/mypage">
          <Responsive component={Button} desktop={{ size: 'l' }} mobile={{ size: 'm' }}>
            Go To Mypage
          </Responsive>
        </Link>
      )}
    </section>
  );
}

export default ChoosePetSection;
