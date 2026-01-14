'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { cn } from '@gitanimals/ui-tailwind';
import { SearchBar } from '@gitanimals/ui-tailwind';
import { ChevronLeftIcon } from 'lucide-react';

import { useGetNextUrl } from '@/hooks/useGetNewUrl';
import { useRouter } from '@/i18n/routing';

export function GuildSearch() {
  const router = useRouter();

  const getNextUrl = useGetNextUrl();

  const [input, setInput] = useState('');
  const searchParams = useSearchParams();
  const text = searchParams.get('text') ?? '';

  const onSubmit = () => {
    const nextUrl = getNextUrl({ text: input });
    router.replace(nextUrl);
  };

  const onSearchReset = () => {
    const nextUrl = getNextUrl({ text: '' });
    router.replace(nextUrl);
  };

  return (
    <>
      {text && (
        <button onClick={onSearchReset}>
          <ChevronLeftIcon size="28px" color="#FFFFFF80" />
        </button>
      )}

      <div className="flex-1">
        <SearchBar
          placeholder="Search for a guild"
          defaultValue={text}
          onChange={(e) => setInput(e.target.value)}
          onSubmit={onSubmit}
          className={cn('max-mobile:w-[calc(100vw-72px)]')}
        />
      </div>
    </>
  );
}
