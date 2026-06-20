'use client';

import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { Loader2 } from 'lucide-react';

export default function SignOutPage() {
  useEffect(() => {
    signOut();
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      {/* TODO: loading 애니메이션 추가 */}
      <Loader2 className="h-[100px] w-[100px]" />
    </div>
  );
}
