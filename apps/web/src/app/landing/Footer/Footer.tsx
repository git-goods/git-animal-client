import * as styles from './Footer.style';

export function Footer() {
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
        <div className={styles.teamContentWrapper}>d</div>
      </article>

      <article className={styles.article}>
        <h2 className={styles.title}>Repositories</h2>
        <ul className={styles.repoContentWrapper}>
          {REPO_DATA.map((repo) => (
            <li key={repo.title} className={styles.repoLi}>
              <span className={styles.repoLiTitle}>{repo.title}</span>

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
