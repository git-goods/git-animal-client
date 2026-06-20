import Image from 'next/image';

export default function GuildLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  return (
    <>
      <div className="absolute w-screen bottom-0 left-1/2 -translate-x-1/2">
        <Image
          src="/guild/guild-bg-bottom.webp"
          className="h-[228px] object-cover"
          alt="bg-bottom"
          width={3600}
          height={228}
        />
        <Image
          src="/guild/guild-bg-bottom-house.webp"
          className="absolute bottom-[32px] right-[62px] h-[202px] w-auto object-contain"
          alt="bg-bottom"
          width={257}
          height={202}
        />
      </div>
      <div className="relative w-full max-w-[880px] m-auto min-h-full flex flex-col justify-center py-[120px] mobile:py-0 mobile:min-h-fit mobile:h-[calc(100vh_-_var(--mobile-header-height))] mobile:p-4">
        {children}
      </div>
      {modal}
    </>
  );
}
