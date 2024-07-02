import React from 'react';
import { Button } from '@gitanimals/ui-panda';

import * as styles from './AvailablePetSection.style';

function AvailablePetSection() {
  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>50+ Available Pets</h2>
      <div className={styles.infoContainer}>
        <div className={styles.infoItem}>
          <p>550+</p>
          <p>Total Users</p>
        </div>
        <div className={styles.infoItem}>
          <p>950+</p>
          <p>Total Adopted Pets</p>
        </div>
        <div className={styles.infoItem}>
          <p>3400+</p>
          <p>Registered Pets for Adoption</p>
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <Button size="m" className="mobile">
          Show More Pets
        </Button>
        <Button size="l" className="desktop">
          Show More Pets
        </Button>
      </div>
    </section>
  );
}

export default AvailablePetSection;
