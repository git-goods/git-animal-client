'use client';

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { css } from '_panda/css';

import Button from '@/components/Button';

import FarmType from './FarmType.1';
import OneType from './OneType';

function RightSection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedType = searchParams.get('type') ?? '1-type';
  return (
    <section>
      <div className={typeSelectStyle}>
        <Button
          color="secondary"
          onClick={() => router.replace(pathname + '?type=1-type')}
          className={selectedType === '1-type' ? 'selected' : ''}
        >
          1 Type
        </Button>
        <Button
          color="secondary"
          onClick={() => router.replace(pathname + '?type=farm-type')}
          className={selectedType === 'farm-type' ? 'selected' : ''}
        >
          Farm Type
        </Button>
      </div>
      <div style={{ minWidth: '1000px' }}>
        {selectedType === '1-type' && <OneType />}
        {selectedType === 'farm-type' && <FarmType />}
      </div>
    </section>
  );
}

export default RightSection;

const typeSelectStyle = css({
  '& button': {
    opacity: 0.1,
    '&.selected': {
      opacity: 1,
    },
  },
});
