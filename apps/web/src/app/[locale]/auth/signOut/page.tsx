'use client';

import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { css } from '_panda/css';
import { Loader2 } from 'lucide-react';

export default function SignOutPage() {
  useEffect(() => {
    signOut();
  }, []);

  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      })}
    >
      {/* TODO: loading 애니메이션 추가 */}
      <Loader2
        className={css({
          width: '100px',
          height: '100px',
        })}
      />
    </div>
  );
}
