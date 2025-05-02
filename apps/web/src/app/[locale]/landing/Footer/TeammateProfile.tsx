import type { FC, ReactElement } from 'react';
import Image from 'next/image';
import { BehanceIcon, GithubIcon } from '@gitanimals/ui-icon';

import * as styles from './TeammateProfile.style';

type UrlType = 'github' | 'behance' | null;
interface Props {
  nickname: string;
  image: {
    src: string;
    width: number;
    height: number;
  };
  urlType: UrlType;
  url: string;
  role: string;
}

const ICON_MAP: Record<Exclude<UrlType, null>, ReactElement> = {
  github: <GithubIcon />,
  behance: <BehanceIcon />,
};

export const TeammateProfile: FC<Props> = ({ nickname, image, urlType, url, role }) => {
  return (
    <div className={styles.wrapperCss}>
      <Image className={styles.imageCss} src={image.src} width={image.width} height={image.height} alt={nickname} />

      <div className={styles.textWrapperCss}>
        <span className={styles.nicknameWrapperCss}>
          <span>{nickname}</span>
          {urlType && (
            <a target="_blank" href={url}>
              {ICON_MAP[urlType]}
            </a>
          )}
        </span>
        <span className={styles.roleCss}>{role}</span>
      </div>
    </div>
  );
};
