import React from 'react';
import Image from 'next/image';

import * as styles from './SliderItem.style';

interface SliderItemProps {
  title: string;
  description: string;
  img: string;
  webpImg: string;
}

function SliderItem({ item }: { item: SliderItemProps }) {
  return (
    <div className={styles.itemContainer}>
      <picture className={styles.itemImage}>
        <source srcSet={item.webpImg} type="image/webp" />
        <Image src={item.img} alt={item.title} width={1024} height={594} />
      </picture>
      <hgroup className={styles.itemHgroup}>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
      </hgroup>
    </div>
  );
}

export default SliderItem;
