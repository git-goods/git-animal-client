'use client';

import { useEffect } from 'react';
import { setRequestInterceptor, setResponseInterceptor } from '@gitanimals/api';
import { setRenderRequestInterceptor, setRenderResponseInterceptor } from '@gitanimals/api/src/_instance';

import {
  interceptorRequestFulfilled,
  interceptorResponseFulfilled,
  interceptorResponseRejected,
} from '@/apis/interceptor';

import LoginButton from './LoginButton';

function JWTPage({
  searchParams,
}: {
  searchParams: {
    jwt: string;
  };
}) {
  const jwtToken = searchParams.jwt;
  const token = jwtToken.split(' ')[1];

  useEffect(() => {}, [token]);

  setRequestInterceptor(interceptorRequestFulfilled);
  setResponseInterceptor(interceptorResponseFulfilled, interceptorResponseRejected);
  setRenderRequestInterceptor(interceptorRequestFulfilled);
  setRenderResponseInterceptor(interceptorResponseFulfilled, interceptorResponseRejected);

  return (
    <div className="fixed inset-0 z-loading flex items-center justify-center bg-[rgba(255,255,255,0.8)] text-[36px]">
      Loading....
      <div style={{ visibility: 'hidden' }}>
        <LoginButton token={token} />
      </div>
    </div>
  );
}

export default JWTPage;
