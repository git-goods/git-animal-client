'use client';

import React from 'react';
import { useAtom } from 'jotai';

import { loadingAtom } from '@/store/loading';

import Loading from './Loading';

function LoadingProvider() {
  const [isLoading, setLoading] = useAtom(loadingAtom);

  if (isLoading) return <Loading />;
  return <></>;
}

export default LoadingProvider;
