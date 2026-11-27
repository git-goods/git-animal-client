'use client';

import type { ComponentProps } from 'react';

import { useRouter } from '@/i18n/routing';

// server component 에서도 쓸 수 있다.
export function BackTrigger(props: ComponentProps<'button'>) {
  const router = useRouter();

  return <button onClick={() => router.back()} {...props} />;
}
