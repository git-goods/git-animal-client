'use client';
import React from 'react';
import { signIn } from 'next-auth/react';

function LoginButton({ token }: { token: string }) {
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.click();
      localStorage.setItem('accessToken', token);
    }
  }, [ref.current]);

  return (
    <div>
      <button
        ref={ref}
        onClick={() =>
          signIn('credentials', {
            token: token,
            callbackUrl: '/mypage',
          })
        }
      >
        LogIn
      </button>
    </div>
  );
}

export default LoginButton;
