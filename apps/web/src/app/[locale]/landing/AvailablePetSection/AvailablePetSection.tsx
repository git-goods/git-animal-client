'use client';

import React, { Suspense } from 'react';
import Image from 'next/image';
import { AnchorButton } from '@gitanimals/ui-tailwind';

import { useGetTotalProductCount } from '@/hooks/query/auction/useGetTotalProductCount';
import { useGetTotalIdentityUserCount } from '@/hooks/query/identity/useGetTotalIdentityUserCount';
import { useGetTotalPersonaCount } from '@/hooks/query/render/useGetTotalPersonaCount';
import { useGetTotalRenderUserCount } from '@/hooks/query/render/useGetTotalRenderUserCount';

import AnimalSlider from './AnimalSlider';
import * as styles from './AvailablePetSection.style';

const MORE_PET_GITHUB_URL =
  'https://github.com/git-goods/gitanimals?tab=readme-ov-file#%EB%93%B1%EC%9E%A5-%EA%B0%80%EB%8A%A5%ED%95%9C-%ED%8E%AB%EB%93%A4';

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
          <AnchorButton size="m" className="mobile" target="_blank" href={MORE_PET_GITHUB_URL}>
            Show More Pets
          </AnchorButton>
          <AnchorButton size="l" className="desktop" target="_blank" href={MORE_PET_GITHUB_URL}>
            Show More Pets
          </AnchorButton>
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
