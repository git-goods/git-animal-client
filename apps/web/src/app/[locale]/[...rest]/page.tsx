// next-intl 에서 404 로 보내려면 catch-all 이 필요하다: https://next-intl.dev/docs/environments/error-files#not-foundjs

import { notFound } from 'next/navigation';

export default function CatchUnknownPage() {
  notFound();
}
