'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SearchBar } from '@gitanimals/ui-panda';

import { useGetNextUrl } from '@/hooks/useGetNewUrl';
import { useRouter } from '@/i18n/routing';

export function GuildSearch() {
  const router = useRouter();

  const getNextUrl = useGetNextUrl();

  const [input, setInput] = useState('');
  const searchParams = useSearchParams();
  const text = searchParams.get('text') ?? '';

  const onSubmit = () => {
    console.log('onSubmit: ', input);
    const nextUrl = getNextUrl({ text: input });
    router.replace(nextUrl);
  };

  return <SearchBar defaultValue={text} onChange={(e) => setInput(e.target.value)} onSubmit={onSubmit} />;
}
