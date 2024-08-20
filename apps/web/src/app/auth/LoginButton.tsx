'use client';
import React from 'react';
import { signIn } from 'next-auth/react';

function LoginButton({ token }: { token: string }) {
  console.log('token: ', token);
  return (
    <div>
      <button
        onClick={() =>
          signIn('credentials', {
            token: token,
            callbackUrl: 'http://localhost:3000/mypage',
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
