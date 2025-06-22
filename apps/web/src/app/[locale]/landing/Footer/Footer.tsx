import type { ComponentProps } from 'react';
import { cx } from '_panda/css';
import { LinkMonoIcon } from '@gitanimals/ui-icon';

import * as styles from './Footer.style';
import { TeammateProfile } from './TeammateProfile';

type TeammateProfileProps = ComponentProps<typeof TeammateProfile>;

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
    <footer className={cx(styles.footer, 'footer')}>
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
