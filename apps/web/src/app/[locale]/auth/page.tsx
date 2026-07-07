'use client';

import LoginButton from './LoginButton';

function JWTPage({
  searchParams,
}: {
  searchParams: {
    jwt: string;
  };
}) {
  const jwtToken = searchParams.jwt;
  // Visiting /auth directly (no ?jwt=) leaves jwtToken undefined; guard the
  // split so the page doesn't crash with "Cannot read properties of undefined".
  const token = jwtToken?.split(' ')[1];

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
