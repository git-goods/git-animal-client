import type { AnchorHTMLAttributes } from 'react';
import { isExternalLink } from '@gitanimals/util-common';

import { Link } from '@/i18n/routing';

export const AdaptiveLink = ({
  href,
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => {
  if (isExternalLink(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
};
