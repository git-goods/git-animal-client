'use client';
import type { PropsWithChildren } from 'react';
import React from 'react';
import { signOut } from 'next-auth/react';

function LogoutButton({ children }: PropsWithChildren) {
  return <button onClick={() => signOut()}>{children}</button>;
}

export default LogoutButton;
