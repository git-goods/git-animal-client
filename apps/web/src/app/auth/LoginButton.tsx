'use client';
import React from 'react';
import { signIn } from 'next-auth/react';

function LoginButton({ token }: { token: string }) {
  console.log('token: ', token);
  return (
    <div>
      <button onClick={() => signIn('credentials', { redirect: false, token: token })}>LogIn</button>
      {/* <button className="rounded-xl border bg-red-300 px-12 py-4" onClick={() => signOut()}>
        Log Out
      </button> */}
    </div>
  );
}

export default LoginButton;
