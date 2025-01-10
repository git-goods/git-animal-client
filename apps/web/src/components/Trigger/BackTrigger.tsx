'use client';

import type { ComponentProps } from 'react';

import { useRouter } from '@/i18n/routing';

/**
 * 이전 페이지로 이동하는 버튼 컴포넌트
 * - server component에서 사용할 수 있음.
 */
export function BackTrigger(props: ComponentProps<'button'>) {
  const router = useRouter();

  return <button onClick={() => router.back()} {...props} />;
}
