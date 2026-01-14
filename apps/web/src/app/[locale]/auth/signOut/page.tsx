'use client';

import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { Loader2 } from 'lucide-react';

export default function SignOutPage() {
  useEffect(() => {
    signOut();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      {/* TODO: loading 애니메이션 추가 */}
      <Loader2 className="w-[100px] h-[100px]" />
    </div>
  );
}
