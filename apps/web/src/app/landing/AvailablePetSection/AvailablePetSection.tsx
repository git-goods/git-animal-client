'use client';

import React, { Suspense } from 'react';
import Image from 'next/image';
import { Button } from '@gitanimals/ui-panda';

import { useGetTotalProductCount } from '@/hooks/query/auction/useGetTotalProductCount';
import { useGetTotalIdentityUserCount } from '@/hooks/query/identity/useGetTotalIdentityUserCount';
import { useGetTotalPersonaCount } from '@/hooks/query/render/useGetTotalPersonaCount';
import { useGetTotalRenderUserCount } from '@/hooks/query/render/useGetTotalRenderUserCount';

import AnimalSlider from './AnimalSlider';
import * as styles from './AvailablePetSection.style';

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
          <Button size="m" className="mobile">
            Show More Pets
          </Button>
          <Button size="l" className="desktop">
            Show More Pets
          </Button>
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
