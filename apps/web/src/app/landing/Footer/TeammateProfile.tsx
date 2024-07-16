import type { FC, ReactElement } from 'react';
import Image from 'next/image';
import { BehanceIcon, GithubIcon } from '@gitanimals/ui-icon';

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
  const ICON_MAP: Record<Props['urlType'], ReactElement> = {
    github: <GithubIcon />,
    behance: <BehanceIcon />,
  };

  return (
    <div className={styles.wrapperCss}>
      <Image className={styles.imageCss} src={image.src} width={image.width} height={image.height} alt={nickname} />
      <span className={styles.nicknameWrapperCss}>
        <span>{nickname}</span>
        <a target="_blank" href={url}>
          {ICON_MAP[urlType]}
        </a>
      </span>
      <span className={styles.roleCss}>{role}</span>
    </div>
  );
};
