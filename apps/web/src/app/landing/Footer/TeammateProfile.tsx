import type { FC } from 'react';
import Image from 'next/image';

import * as styles from './TeammateProfile.style';

interface Props {
  nickname: string;
  image: {
    src: string;
    width: number;
    height: number;
  };
  urlType: 'github' | 'behance';
  url: string;
  role: string;
}

export const TeammateProfile: FC<Props> = ({ nickname, image, urlType, url, role }) => {
  return (
    <div className={styles.wrapperCss}>
      <Image className={styles.imageCss} src={image.src} width={image.width} height={image.height} alt={nickname} />
      <span className={styles.nicknameWrapperCss}>
        <span>{nickname}</span>
        {/* TODO: icon */}
      </span>
      <span className={styles.roleCss}>{role}</span>
    </div>
  );
};
