import { Button } from '@gitanimals/ui-tailwind';

import { getServerAuth } from '@/auth';
import { LoginButton } from '@/components/AuthButton';
import { Responsive } from '@/components/Responsive';
import { Link } from '@/i18n/routing';

import MainSlider from './MainSlider';
import { TopBanner } from './TopBanner';

async function MainSection() {
  const session = await getServerAuth();
  return (
    <section className="relative flex flex-col items-center justify-center overflow-x-hidden pt-[120px] pb-[120px] text-center mobile:p-[80px_12px]">
      <TopBanner />
      <h1 className="glyph82-bold max-w-[800px] text-white mobile:glyph40-bold">Have your pet in GITHUB! </h1>
      <p className="glyph24-regular max-w-[600px] text-white mt-[16px] mb-[40px] mobile:glyph16-regular mobile:mb-[20px] mobile:mt-[20px]">
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
      <div className="absolute bottom-0 left-0 right-0 top-0 z-hide h-full w-full bg-[linear-gradient(151deg,#016EDB_11.25%,#16B7CD_61.95%,#5CCA69_94.01%)] [&_img]:h-full [&_img]:w-full [&_img]:object-cover" />
      <div className="mt-[80px]">
        <MainSlider />
      </div>
    </section>
  );
}

export default MainSection;
