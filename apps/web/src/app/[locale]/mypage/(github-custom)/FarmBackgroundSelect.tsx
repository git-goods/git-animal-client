/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import type { RenderBackground } from '@gitanimals/api';
import { renderUserQueries, useChangeMyBackgroundByToken } from '@gitanimals/react-query';
import { cn } from '@gitanimals/ui-tailwind/utils';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { customScrollStyle } from '@/styles/scrollStyle';
import { useClientSession, useClientUser } from '@/utils/clientAuth';
import { getBackgroundImage } from '@/utils/image';

export const FarmBackgroundSelect = wrap
  .ErrorBoundary({ fallback: <></> })
  .Suspense({
    fallback: <></>,
  })
  .on(function FarmBackgroundSelect({
    onChangeStatus,
  }: {
    onChangeStatus: (status: 'loading' | 'success' | 'error') => void;
  }) {
    const session = useClientSession();
    const { name } = useClientUser();

    const [selectedBackground, setSelectedBackground] = useState<RenderBackground | null>(null);

    const {
      data: { backgrounds },
    } = useSuspenseQuery(renderUserQueries.getMyBackground(name));
    const { mutate: changeMyBackground } = useChangeMyBackgroundByToken(session.data?.user.accessToken ?? '', {
      onMutate: () => {
        onChangeStatus('loading');
      },
      onSuccess: () => {
        onChangeStatus('success');
      },
      onError: () => {
        onChangeStatus('error');
      },
    }); // TODO: 추후 수정

    const handleChangeBackground = (background: RenderBackground) => {
      changeMyBackground({ type: background.type });
      setSelectedBackground(background);
    };

    // TODO: 마우스로도 스크롤 움직일 수 있도록 개선 필요
    return (
      <div className={cn('overflow-x-auto', customScrollStyle)}>
        <div className="w-fit flex flex-nowrap gap-1">
          {backgrounds.map((background) => (
            <BackgroundItem
              key={background.type}
              {...background}
              isSelected={selectedBackground?.type === background.type}
              onClick={() => handleChangeBackground(background)}
            />
          ))}
        </div>
      </div>
    );
  });

interface BackgroundItemProps extends RenderBackground {
  isSelected: boolean;
  onClick: () => void;
}

function BackgroundItem({ type, isSelected, onClick }: BackgroundItemProps) {
  return (
    <button
      className={cn('border border-transparent w-[248px] rounded-lg overflow-hidden', isSelected && 'border-white/90')}
      onClick={onClick}
    >
      <img src={getBackgroundImage(type)} alt={type} width={248} height={124} draggable={false} />
    </button>
  );
}
