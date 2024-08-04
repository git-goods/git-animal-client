import type { ComponentProps } from 'react';
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
      nickname: 'yuna',
      urlType: 'behance',
      image: {
        src: '/teammate/yuna.webp',
        width: 34,
        height: 34,
      },
      url: 'https://www.behance.net/hyn991022a6be',
      role: 'Design',
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
  ];

  const REPO_DATA = [
    { title: 'Organization', href: 'https://github.com/git-goods' },
    { title: 'Gitanimals', href: 'https://github.com/git-goods/gitanimals' },
    { title: 'Client', href: 'https://github.com/git-goods/git-animal-client' },
    { title: 'API', href: 'https://github.com/git-goods/gitanimals-api' },
  ];

  return (
    <footer className={styles.footer}>
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
