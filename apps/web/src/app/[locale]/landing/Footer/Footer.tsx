import type { ComponentProps } from 'react';
import { LinkMonoIcon } from '@gitanimals/ui-icon';
import { cn } from '@gitanimals/ui-tailwind';

import { TeammateProfile } from './TeammateProfile';

type TeammateProfileProps = ComponentProps<typeof TeammateProfile>;

const styles = {
  footer: 'flex flex-col gap-[120px] bg-black w-full text-white py-[120px] px-0 mobile:py-[80px] mobile:px-[16px] mobile:gap-[60px]',
  article: 'flex w-full max-w-[1120px] mx-auto mobile:flex-col mobile:gap-[24px]',
  title: 'w-[348px] flex-shrink glyph28-bold text-white mobile:glyph18-bold',
  teamContentWrapper: 'w-full flex gap-[24px] flex-wrap mobile:gap-[12px]',
  repoContentWrapper: 'w-full flex flex-col gap-[16px]',
  repoLi: 'flex gap-[8px] mobile:flex-col mobile:gap-[1px]',
  repoLiTitle: 'flex items-center gap-[8px] w-[226px] glyph18-bold mobile:glyph15-bold mobile:gap-[17px]',
  repoLiLink: 'glyph16-regular text-white-75 underline mobile:glyph12-regular mobile:ml-[37px]',
};

export function Footer() {
  const TEAMMATE_DATA: TeammateProfileProps[] = [
    {
      nickname: 'devxb',
      urlType: 'github',
      image: {
        src: '/teammate/devxb.webp',
        width: 34,
        height: 34,
      },
      url: 'https://github.com/devxb',
      role: 'PM ∙ Backend',
    },
    {
      nickname: 'sumi',
      urlType: 'github',
      image: {
        src: '/teammate/sumi.webp',
        width: 45,
        height: 34,
      },
      url: 'https://github.com/sumi-0011',
      role: 'Frontend',
    },
    {
      nickname: 'Jiwoo',
      urlType: 'behance',
      image: {
        src: '/teammate/jiwoo.webp',
        width: 34,
        height: 34,
      },
      url: 'https://www.behance.net/sopungcjw42af',
      role: 'Designer',
    },
    {
      nickname: 'sunwoo',
      urlType: 'behance',
      image: {
        src: '/teammate/sunwoo.webp',
        width: 34,
        height: 34,
      },
      url: 'https://www.behance.net/6a39a177',
      role: 'Designer',
    },
    {
      nickname: 'seunghun',
      urlType: 'github',
      image: {
        src: '/teammate/seunghun.webp',
        width: 34,
        height: 34,
      },
      url: 'https://github.com/Orchemi',
      role: 'Frontend',
    },
    {
      nickname: 'hyesungoh',
      urlType: 'github',
      image: {
        src: '/teammate/hyesungoh.webp',
        width: 34,
        height: 34,
      },
      url: 'https://github.com/hyesungoh',
      role: 'Frontend',
    },
    {
      nickname: 'gaeun',
      urlType: null,
      image: {
        src: '/teammate/gaeun.webp',
        width: 34,
        height: 34,
      },
      url: 'https://github.com/hyesungoh',
      role: 'Data Analyst',
    },
  ] as const;

  const REPO_DATA = [
    { title: 'Organization', href: 'https://github.com/git-goods' },
    { title: 'Gitanimals', href: 'https://github.com/git-goods/gitanimals' },
    { title: 'Client', href: 'https://github.com/git-goods/git-animal-client' },
    { title: 'API', href: 'https://github.com/git-goods/gitanimals-api' },
  ] as const;

  return (
    <footer className={cn(styles.footer, 'footer')}>
      <article className={styles.article}>
        <h2 className={styles.title}>Teams</h2>
        <div className={styles.teamContentWrapper}>
          {TEAMMATE_DATA.map((teammate) => (
            <TeammateProfile key={teammate.nickname} {...teammate} />
          ))}
        </div>
      </article>

      <article className={styles.article}>
        <h2 className={styles.title}>Repositories</h2>
        <ul className={styles.repoContentWrapper}>
          {REPO_DATA.map((repo) => (
            <li key={repo.title} className={styles.repoLi}>
              <span className={styles.repoLiTitle}>
                <LinkMonoIcon color="#9E9E9E" />
                <span>{repo.title}</span>
              </span>

              <a href={repo.href} target="_blank" className={styles.repoLiLink}>
                {repo.href}
              </a>
            </li>
          ))}
        </ul>
      </article>
    </footer>
  );
}
