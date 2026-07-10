import { useTranslations } from 'next-intl';
import { overlay } from 'overlay-kit';
import { toast } from 'sonner';

import { trackEvent } from '@/lib/analytics';
import { copyClipBoard } from '@/utils/copy';

import { GithubGuideModal } from './GithubGuideModal';
import { hasSeenGithubGuide, markGithubGuideSeen } from './guideStorage';

export function useGithubPublish() {
  const t = useTranslations('Mypage');

  return async ({ code, username, type }: { code: string; username: string; type: 'farm' | 'line' }) => {
    try {
      await copyClipBoard(code);
    } catch {}

    if (hasSeenGithubGuide()) {
      trackEvent('github_guide_skipped', { type });
      toast.success(t('copy-link-success'), { duration: 2000 });
    } else {
      markGithubGuideSeen();
      trackEvent('github_guide_opened', { type });
      overlay.open(({ isOpen, close }) => (
        <GithubGuideModal isOpen={isOpen} onClose={close} username={username} code={code} type={type} />
      ));
    }
  };
}
