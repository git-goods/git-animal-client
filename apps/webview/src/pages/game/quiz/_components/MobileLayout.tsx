'use client';

import React from 'react';

export const MobileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative z-0 flex h-full w-full flex-col items-center">
      <div className="relative z-[1] flex h-full min-h-[var(--container-height)] w-full flex-col items-start justify-start">
        {children}
      </div>
    </div>
  );
};
