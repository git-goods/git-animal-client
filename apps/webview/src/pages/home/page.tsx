'use client';

import CharacterView from './_components/CharacterView';
import { ProfileBoard } from './_components/ProfileBoard';

export default function WebviewPage() {
  return (
    <div className="relative mx-auto flex h-full w-full max-w-[var(--container-max-width)] flex-col justify-between">
      <div className="absolute bottom-0 left-0 flex h-full w-full flex-col justify-end bg-[#098761]">
        <img
          src="/assets/home/app-background-home.png"
          alt="background"
          className="min-h-[90%] w-full object-cover object-bottom object-center"
        />
      </div>
      <div className="relative flex h-full flex-col justify-between pb-[25%]">
        <ProfileBoard />
        <CharacterView />
      </div>
    </div>
  );
}
