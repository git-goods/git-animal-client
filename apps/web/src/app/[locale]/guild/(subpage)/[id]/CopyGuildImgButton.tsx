'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@gitanimals/ui-tailwind';
import { toast } from 'sonner';

import { getGuildString } from '@/components/Gitanimals';
import { copyClipBoard } from '@/utils/copy';

export function CopyGuildImgButton({ guildId }: { guildId: string }) {
  const t = useTranslations('Preview');

  const onLinkCopy = async () => {
    try {
      await copyClipBoard(
        getGuildString({
          guildId,
          sizes: [600, 300],
        }),
      );

      toast.success(t('copy-link-success'), { duration: 2000 });
    } catch (error) {}
  };

  return (
    <Button onClick={onLinkCopy} size="m" variant="secondary" className="mx-auto">
      {t('copy-link-title')}
    </Button>
  );
}
