import type { FC, ReactElement } from 'react';
import Image from 'next/image';
import { BehanceIcon, GithubIcon } from '@gitanimals/ui-icon';

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

const styles = {
  wrapper: 'w-[calc(25%-24px)] flex flex-col mobile:w-[calc(50%-6px)] mobile:flex-row mobile:gap-[5px]',
  image:
    'mb-[8px] mobile:w-[32px] mobile:h-[24px] mobile:mb-[0px] mobile:object-contain mobile:object-[left_50%]',
  textWrapper: 'flex flex-col',
  nicknameWrapper: 'flex items-center gap-[5px] mb-[4px] mobile:mb-[1px]',
  nickname: 'glyph18-bold text-white-90 mobile:glyph15-bold mobile:font-bold',
  role: 'glyph16-regular text-white-75 mobile:glyph12-regular',
};

const ICON_MAP: Record<Exclude<UrlType, null>, ReactElement> = {
  github: <GithubIcon />,
  behance: <BehanceIcon />,
};

export const TeammateProfile: FC<Props> = ({ nickname, image, urlType, url, role }) => {
  return (
    <div className={styles.wrapper}>
      <Image className={styles.image} src={image.src} width={image.width} height={image.height} alt={nickname} />

      <div className={styles.textWrapper}>
        <span className={styles.nicknameWrapper}>
          <span className={styles.nickname}>{nickname}</span>
          {urlType && (
            <a target="_blank" href={url}>
              {ICON_MAP[urlType]}
            </a>
          )}
        </span>
        <span className={styles.role}>{role}</span>
      </div>
    </div>
  );
};
