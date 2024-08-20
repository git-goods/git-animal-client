'use client';
import React from 'react';
import { signIn } from 'next-auth/react';

function LoginButton({ token }: { token: string }) {
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
