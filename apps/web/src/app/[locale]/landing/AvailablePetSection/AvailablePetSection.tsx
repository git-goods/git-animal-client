'use client';

import React, { Suspense } from 'react';
import Image from 'next/image';
import { AnchorButton } from '@gitanimals/ui-tailwind';

import { Responsive } from '@/components/Responsive';
import { useGetTotalProductCount } from '@/hooks/query/auction/useGetTotalProductCount';
import { useGetTotalIdentityUserCount } from '@/hooks/query/identity/useGetTotalIdentityUserCount';
import { useGetTotalPersonaCount } from '@/hooks/query/render/useGetTotalPersonaCount';
import { useGetTotalRenderUserCount } from '@/hooks/query/render/useGetTotalRenderUserCount';

import AnimalSlider from './AnimalSlider';

const MORE_PET_GITHUB_URL =
  'https://github.com/git-goods/gitanimals?tab=readme-ov-file#%EB%93%B1%EC%9E%A5-%EA%B0%80%EB%8A%A5%ED%95%9C-%ED%8E%AB%EB%93%A4';

const styles = {
  container:
    'flex flex-col items-center justify-center gap-[60px] py-[120px] relative bg-[#171717] mobile:gap-[40px] mobile:py-[80px]',
  content:
    'flex flex-col items-center justify-center gap-[60px] relative z-floating mobile:gap-[40px]',
  heading: 'glyph82-bold text-white mobile:glyph32-bold',
  infoContainer:
    'flex flex-row justify-between gap-[60px] w-full max-w-[766px] px-[52px] py-[40px] bg-white-10 rounded-[16px] mobile:flex-col mobile:gap-[12px] mobile:p-[24px] mobile:max-w-[calc(100%-40px)]',
  infoItem:
    'w-fit [&_p:first-child]:glyph48-bold [&_p:first-child]:text-[#FDFAFF] mobile:[&_p:first-child]:glyph24-bold [&_p:last-child]:glyph18-bold [&_p:last-child]:text-white-50 mobile:[&_p:last-child]:glyph14-regular',
  buttonWrapper: 'pt-[20px] mobile:pt-0',
  bgPictureTop: 'absolute left-0 right-0 top-0 z-0',
  bgPictureBottom: 'absolute left-0 right-0 bottom-0 z-0',
};

function AvailablePetSection() {
  return (
    <section className={styles.container}>
      <div className={styles.bgPictureTop}>
        <Image src="/main/section2_bg-top.webp" alt="Available Pets" width={1920} height={382} />
      </div>
      <div className={styles.bgPictureBottom}>
        <Image src="/main/section2_bg-bottom.webp" alt="Available Pets" width={1920} height={382} />
      </div>
      <div className={styles.content}>
        <h2 className={styles.heading}>50+ Available Pets</h2>
        <div className={styles.infoContainer}>
          <div className={styles.infoItem}>
            <Suspense fallback={<p></p>}>
              <TotalUsers />
            </Suspense>
            <p>Total Users</p>
          </div>
          <div className={styles.infoItem}>
            <Suspense fallback={<p></p>}>
              <TotalAdoptedPets />
            </Suspense>

            <p>Total Adopted Pets</p>
          </div>
          <div className={styles.infoItem}>
            <Suspense fallback={<p></p>}>
              <RegisteredPets />
            </Suspense>
            <p>Registered Pets for Adoption</p>
          </div>
        </div>
        <div>
          <Suspense fallback={<></>}>
            <AnimalSlider />
          </Suspense>
        </div>

        <div className={styles.buttonWrapper}>
          <Responsive
            component={AnchorButton}
            desktop={{ size: 'l' }}
            mobile={{ size: 'm' }}
            target="_blank"
            href={MORE_PET_GITHUB_URL}
          >
            Show More Pets
          </Responsive>
        </div>
      </div>
    </section>
  );
}

export default AvailablePetSection;

function TotalUsers() {
  const { data: identityData } = useGetTotalIdentityUserCount();
  const { data: renderData } = useGetTotalRenderUserCount();
  return <p>{Number(identityData.userCount ?? 0) + Number(renderData.userCount ?? 0)}+</p>;
}

function TotalAdoptedPets() {
  const { data } = useGetTotalPersonaCount();
  return <p>{data.personaCount}+</p>;
}

function RegisteredPets() {
  const { data } = useGetTotalProductCount();

  return <p>{data.count}+</p>;
}
