'use client';
import React from 'react';
import { signIn } from 'next-auth/react';

function LoginButton({ token }: { token: string }) {
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.click();
    }
  }, [ref.current]);

  return (
    <div>
      <button
        ref={ref}
        onClick={() =>
          signIn('credentials', {
            token: token,
            callbackUrl: 'http://localhost:3000/dev',
          })
        }
      >
        LogIn
      </button>
    </div>
  );
}

export default LoginButton;
