import React from 'react';
import Image from 'next/image';
import { cn } from '@gitanimals/ui-tailwind';

const styles = {
  section: 'py-[120px] bg-brand-beige mobile:py-[80px] mobile:px-[16px]',
  heading: 'text-black glyph48-bold text-center mb-[80px]',
  wayContainer: 'grid grid-cols-2 max-w-[1120px] gap-[24px] m-auto mobile:grid-cols-1',
  wayItem: 'relative flex flex-col gap-[12px] justify-between mobile:gap-[4px]',
  wayItemHeading: 'glyph32-bold flex items-center gap-[12px] pt-[40px] px-[40px] mobile:glyph20-bold',
  wayItemHeadingSpan: 'glyph22-regular block w-[32px] h-[32px] bg-black text-white text-center mobile:glyph16-regular mobile:w-[24px] mobile:h-[24px]',
  wayItemDesc: 'glyph18-regular mt-[16px] px-[40px] text-black-90 mobile:glyph14-regular',
  wayItemImage: 'w-full',
};

function HavePetWaySection() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Two Ways to Have Pets</h2>
      <div className={styles.wayContainer}>
        <div className={cn(styles.wayItem, 'bg-brand-coral')}>
          <div>
            <h3 className={styles.wayItemHeading}>
              <span className={styles.wayItemHeadingSpan}>1</span>
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
              <span className={styles.wayItemHeadingSpan}>2</span>
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
