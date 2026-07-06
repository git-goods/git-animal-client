import Image from 'next/image';
import { Button } from '@gitanimals/ui-tailwind';

import { getServerAuth } from '@/auth';
import { LoginButton } from '@/components/AuthButton';
import { Link } from '@/i18n/routing';

import { MotionPet } from './MotionPet';
import { Snowflake } from './Snowflake';

export async function ChristmasContent() {
  const session = await getServerAuth();
  return (
    <div>
      <div className="relative w-full h-[calc(100vh-60px)] grid grid-cols-[3fr_4fr] pt-[10%] mobile:grid-cols-[1fr]">
        {[...Array(20)].map((_, i) => (
          <Snowflake
            key={i}
            delay={i * 0.3}
            left={`${Math.random() * 100}%`}
            size={10 + Math.random() * 15}
            duration={8 + Math.random() * 3}
          />
        ))}

        <Image
          src="/event/christmas/christmas-bg.webp"
          alt="christmas bg"
          layout="fill"
          objectFit="cover"
          className="pointer-events-none [object-position:bottom_center]"
        />

        <div className="relative w-full h-full max-h-[calc(100vh-60px)] mobile:hidden">
          <div className="absolute bottom-0 right-0 object-contain h-full select-none cursor-pointer">
            <MotionPet />
          </div>
        </div>
        <div className="flex relative w-[80%] h-full pl-[40px] z-[2] flex-col justify-center pb-[160px] mobile:w-full mobile:items-center mobile:justify-center mobile:pb-[100px] mobile:pl-0">
          <Image
            src="/event/christmas/christmas-logo.svg"
            alt="gitanimals christmas event"
            width={1357}
            height={199}
            objectFit="contain"
            className="object-contain h-auto mobile:max-w-[90vw]"
            draggable={false}
          />
          <p className="text-white-90 glyph32-bold font-normal whitespace-pre-line mt-[40px] mb-[40px] mobile:glyph16-regular mobile:text-[16px] mobile:mt-[20px] mobile:text-center">
            Christmas is here in Gitaniamals!
            <br />
            Draw a Christmas pet now!
          </p>
          <div className="flex gap-[10px]">
            {!session ? (
              <LoginButton label="Pick a Christmas pet now" />
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
          </div>
        </div>
      </div>
    </div>
  );
}
