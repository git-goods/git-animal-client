import React from 'react';
import Image from 'next/image';
import { cn } from '@gitanimals/ui-tailwind/utils';

import * as styles from './HavePetWaySection.style';

function HavePetWaySection() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Two Ways to Have Pets</h2>
      <div className={styles.wayContainer}>
        <div className={cn(styles.wayItem, 'bg-brand-coral')}>
          <div>
            <h3 className={styles.wayItemHeading}>
              <span>1</span>
              Contributions 30 times
            </h3>
            <p className={styles.wayItemDesc}>
              When you accumulate 30 commits, a new pet will appear. At this point, all pets have different
              probabilities of appearing. The maximum number of pets you can have is 30. If you have more than 30 pets,
              they will go into your inventory, and you can swap them with the pets displayed at any time.
            </p>
          </div>
          <Image
            className={styles.wayItemImage}
            src="/main/have-pet-way-1.webp"
            alt="have-pet-way-1"
            width={548}
            height={360}
          />
        </div>
        <div className={cn(styles.wayItem, 'bg-brand-turquoise')}>
          <div>
            <h3 className={styles.wayItemHeading}>
              <span>2</span>
              Purchase Pets
            </h3>
            <p className={styles.wayItemDesc}>
              You can buy pets sold by other users with commit points. A certain amount of points will be given per
              commit. Alternatively, you can sell your own pets to earn commit points.
            </p>
          </div>
          <Image
            className={styles.wayItemImage}
            src="/main/have-pet-way-2.webp"
            alt="have-pet-way-1"
            width={548}
            height={360}
          />
        </div>
      </div>
    </section>
  );
}

export default HavePetWaySection;
