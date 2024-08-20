'use client';
import React from 'react';
import { signIn, useSession } from 'next-auth/react';

function LoginButton({ token }: { token: string }) {
  const { data: session } = useSession();
  console.log('session: ', session);

  return (
    <div>
      <button
        onClick={() =>
          signIn('credentials', {
            token: token,
            callbackUrl: 'http://localhost:3000/dev',
          })
        }
      >
        LogIn
      </button>
      {/* <button className="rounded-xl border bg-red-300 px-12 py-4" onClick={() => signOut()}>
        Log Out
      </button> */}
    </div>
  );
}

export default LoginButton;
