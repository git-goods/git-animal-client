import { useTranslations } from 'next-intl';
import { css } from '_panda/css';
import { Button } from '@gitanimals/ui-panda';
import { toast } from 'sonner';

import { getGitanimalsFarmString, GitanimalsFarm } from '@/components/Gitanimals';
import { useClientUser } from '@/utils/clientAuth';
import { copyClipBoard } from '@/utils/copy';

export function FarmPreview({ selectPersona, loading }: { selectPersona: string[]; loading: boolean }) {
  const t = useTranslations('Mypage');
  const { name } = useClientUser();

  const onLinkCopy = async () => {
    try {
      await copyClipBoard(getGitanimalsFarmString({ username: name }));

      toast.success('복사 성공!', { duration: 2000 });
    } catch (error) {}
  };

  return (
    <div>
      <div className={farmStyle}>
        <GitanimalsFarm imageKey={`${selectPersona.length}/${loading ? 'loading' : ''}`} sizes={[600, 300]} />
      </div>
      <Button onClick={onLinkCopy} mt={16} size="m">
        {t('copy-link-title')}
      </Button>
    </div>
  );
}

const farmStyle = css({ borderRadius: '12px', overflow: 'hidden', width: 'fit-content' });
