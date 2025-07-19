import type { AnchorHTMLAttributes } from 'react';
import { isExternalLink } from '@gitanimals/util-common';

import { Link } from '@/i18n/routing';

/**
 * 제공된 href에 따라 외부 링크를 위한 <a> 태그 또는 내부 경로를 위한 Next.js <Link> 컴포넌트를 렌더링
 */
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
