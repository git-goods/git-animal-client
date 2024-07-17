import React from 'react';
import Image from 'next/image';
import { Button } from '@gitanimals/ui-panda';

import AnimalSlider from './AnimalSlider';
import * as styles from './AvailablePetSection.style';

const TOTAL_USERS = 550;
const TOTAL_ADOPTED_PETS = 950;
const REGISTERED_PETS = 3400;

function AvailablePetSection() {
  return (
    <section className={styles.container}>
      <picture className={styles.bgPictureTop}>
        <source srcSet="/main/section2_bg-top.webp" type="image/webp" />
        <Image src="/main/section2_bg-top.png" alt="Available Pets" width={1920} height={382} />
      </picture>
      <picture className={styles.bgPictureBottom}>
        <source srcSet="/main/section2_bg-bottom.webp" type="image/webp" />
        <Image src="/main/section2_bg-bottom.png" alt="Available Pets" width={1920} height={382} />
      </picture>
      <div className={styles.content}>
        <h2 className={styles.heading}>50+ Available Pets</h2>
        <div className={styles.infoContainer}>
          <div className={styles.infoItem}>
            <p>{TOTAL_USERS}+</p>
            <p>Total Users</p>
          </div>
          <div className={styles.infoItem}>
            <p>{TOTAL_ADOPTED_PETS}+</p>
            <p>Total Adopted Pets</p>
          </div>
          <div className={styles.infoItem}>
            <p>{REGISTERED_PETS}+</p>
            <p>Registered Pets for Adoption</p>
          </div>
        </div>
        <div>
          <AnimalSlider />
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
