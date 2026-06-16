'use client';

import { useTranslations } from 'next-intl';
import { css } from '_panda/css';
import { AnchorButton, Button, Dialog } from '@gitanimals/ui-panda';
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
              <strong>{t('step1-title')}</strong>
              <p>
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
              <strong>{t('step2-title')}</strong>
              <p>{t('step2-desc')}</p>
              <button
                type="button"
                className={codeBlockStyle}
                onClick={onRecopy}
                aria-label={tMypage('copy-link-title')}
              >
                <code>{code}</code>
                <Copy size={16} className={codeCopyIconStyle} />
              </button>
            </div>
          </li>

          <li className={stepItemStyle}>
            <span className={stepBadgeStyle}>3</span>
            <div className={stepBodyStyle}>
              <strong>{t('step3-title')}</strong>
              <p>{t('step3-desc')}</p>
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

const contentStyle = css({ maxWidth: '460px', width: '100%', textAlign: 'left' });

const headerStyle = css({ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' });

const checkIconStyle = css({ color: 'brand.green' });

const subtitleStyle = css({ textStyle: 'glyph14.regular', color: 'gray.gray_500' });

const stepListStyle = css({ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' });

const stepItemStyle = css({ display: 'flex', gap: '12px', alignItems: 'flex-start' });

const stepBadgeStyle = css({
  flexShrink: 0,
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'brand.green',
  color: 'white.white_100',
  textStyle: 'glyph14.bold',
});

const stepBodyStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  '& strong': { textStyle: 'glyph16.bold', color: 'white.white_100' },
  '& p': { textStyle: 'glyph14.regular', color: 'gray.gray_500' },
});

const codeChipStyle = css({
  padding: '1px 6px',
  borderRadius: '4px',
  background: 'gray.gray_400',
  color: 'white.white_100',
  fontFamily: 'monospace',
});

const codeBlockStyle = css({
  marginTop: '8px',
  width: '100%',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: '8px',
  padding: '12px',
  borderRadius: '8px',
  background: 'gray.gray_400',
  cursor: 'pointer',
  textAlign: 'left',
  maxHeight: '120px',
  overflowY: 'auto',
  '& code': {
    fontFamily: 'monospace',
    fontSize: '12px',
    color: 'white.white_100',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-all',
  },
});

const codeCopyIconStyle = css({ flexShrink: 0, color: 'gray.gray_500' });

const footerStyle = css({ width: '100%', display: 'flex', gap: '8px' });

const primaryButtonStyle = css({
  flex: 1,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  whiteSpace: 'nowrap',
  textDecoration: 'none',
});
