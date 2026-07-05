'use client';

import { useTranslations } from 'next-intl';
import { AnchorButton, Button, Dialog } from '@gitanimals/ui-tailwind';
import { CheckCircle2, Copy } from 'lucide-react';
import { toast } from 'sonner';

import { trackEvent } from '@/lib/analytics';
import { copyClipBoard } from '@/utils/copy';

interface GithubGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  code: string;
  type: 'farm' | 'line';
}

export function GithubGuideModal({ isOpen, onClose, username, code, type }: GithubGuideModalProps) {
  const t = useTranslations('Mypage.GithubGuide');
  const tMypage = useTranslations('Mypage');

  const repoName = `${username} / ${username}`;
  const newRepoUrl = `https://github.com/new?name=${encodeURIComponent(username)}`;

  const onRecopy = async () => {
    try {
      await copyClipBoard(code);
      toast.success(tMypage('copy-link-success'), { duration: 2000 });
    } catch {}
  };

  const onClickLater = () => {
    trackEvent('click_guide_later', { type });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Dialog.Content className={contentStyle}>
        <div className={headerStyle}>
          <CheckCircle2 size={28} className={checkIconStyle} />
          <Dialog.Title>{t('modal-title')}</Dialog.Title>
          <p className={subtitleStyle}>{t('modal-subtitle')}</p>
        </div>

        <ol className={stepListStyle}>
          <li className={stepItemStyle}>
            <span className={stepBadgeStyle}>1</span>
            <div className={stepBodyStyle}>
              <strong className="glyph16-bold text-white-100">{t('step1-title')}</strong>
              <p className="glyph14-regular text-gray-500">
                {t.rich('step1-desc', {
                  repo: repoName,
                  code: (chunks) => <code className={codeChipStyle}>{chunks}</code>,
                })}
              </p>
            </div>
          </li>

          <li className={stepItemStyle}>
            <span className={stepBadgeStyle}>2</span>
            <div className={stepBodyStyle}>
              <strong className="glyph16-bold text-white-100">{t('step2-title')}</strong>
              <p className="glyph14-regular text-gray-500">{t('step2-desc')}</p>
              <button
                type="button"
                className={codeBlockStyle}
                onClick={onRecopy}
                aria-label={tMypage('copy-link-title')}
              >
                <code className="font-mono text-[12px] text-white-100 whitespace-pre-wrap break-all">{code}</code>
                <Copy size={16} className={codeCopyIconStyle} />
              </button>
            </div>
          </li>

          <li className={stepItemStyle}>
            <span className={stepBadgeStyle}>3</span>
            <div className={stepBodyStyle}>
              <strong className="glyph16-bold text-white-100">{t('step3-title')}</strong>
              <p className="glyph14-regular text-gray-500">{t('step3-desc')}</p>
            </div>
          </li>
        </ol>

        <Dialog.Footer className={footerStyle}>
          <AnchorButton
            href={newRepoUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="m"
            className={primaryButtonStyle}
            onClick={() => trackEvent('click_create_repo', { type })}
          >
            {t('create-repo-button')}
          </AnchorButton>
          <Button variant="secondary" size="m" onClick={onClickLater}>
            {t('later-button')}
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}

const contentStyle = 'max-w-[460px] w-full text-left';

const headerStyle = 'w-full flex flex-col gap-[8px]';

const checkIconStyle = 'text-brand-green';

const subtitleStyle = 'glyph14-regular text-gray-500';

const stepListStyle = 'w-full flex flex-col gap-[20px]';

const stepItemStyle = 'flex gap-[12px] items-start';

const stepBadgeStyle =
  'shrink-0 w-[24px] h-[24px] rounded-full flex items-center justify-center bg-brand-green text-white-100 glyph14-bold';

const stepBodyStyle = 'flex flex-col gap-[4px]';

const codeChipStyle = 'px-[6px] py-[1px] rounded-[4px] bg-gray-400 text-white-100 font-mono';

const codeBlockStyle =
  'mt-[8px] w-full flex items-start justify-between gap-[8px] p-[12px] rounded-[8px] bg-gray-400 cursor-pointer text-left max-h-[120px] overflow-y-auto';

const codeCopyIconStyle = 'shrink-0 text-gray-500';

const footerStyle = 'w-full flex gap-[8px]';

const primaryButtonStyle = 'flex-1 inline-flex items-center justify-center whitespace-nowrap no-underline';
