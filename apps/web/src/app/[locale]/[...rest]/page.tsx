/**
 * next-intl에서 404 페이지 정상 이동을 위한 page 설정
 * reference: https://next-intl.dev/docs/environments/error-files#not-foundjs
 */

import { notFound } from 'next/navigation';

export default function CatchUnknownPage() {
  notFound();
}
