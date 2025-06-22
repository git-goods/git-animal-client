'use client';

import Error from 'next/error';

export default function NotFound() {
  console.log('Not Found -------------------------------');
  return <Error statusCode={404} title="Not Found" />;
}
