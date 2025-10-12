'use client';

import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { css } from '_panda/css';
import { Flex } from '_panda/jsx';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Heart } from 'lucide-react';
import { toast } from 'sonner';

import { createOrUpdateUpvote } from '@/apis/laboratory/feedback';
import { LABORATORY_FEEDBACK_QUERY_KEYS, upvoteQueryOptions } from '@/apis/laboratory/useLaboratoryFeedback';
import { useClientUser } from '@/utils/clientAuth';

interface LaboratoryLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  showBackButton?: boolean;
  laboratoryId?: string;
}

export function LaboratoryLayout({
  children,
  title,
  description,
  showBackButton = true,
  laboratoryId,
}: LaboratoryLayoutProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id: userId, name: username } = useClientUser();

  const { data: checkData } = useQuery({
    ...upvoteQueryOptions.checkUserUpvote(userId?.toString() ?? '', laboratoryId ?? ''),
    enabled: !!userId && !!laboratoryId,
  });
  const hasUpvoted = checkData?.hasUpvoted ?? false;

  const { data: upvoteCount } = useQuery({
    ...upvoteQueryOptions.getUpvoteCount(laboratoryId ?? ''),
    enabled: !!laboratoryId,
  });

  const { mutate: upvoteMutate, isPending: isUpvoting } = useMutation({
    mutationFn: createOrUpdateUpvote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LABORATORY_FEEDBACK_QUERY_KEYS.all });
      toast.success('업보트 완료! 감사합니다 🎉', {
        duration: 2000,
        position: 'top-center',
      });
    },
    onError: (error) => {
      toast.error(`오류가 발생했습니다: ${error.message}`, {
        duration: 3000,
        position: 'top-center',
      });
    },
  });

  const handleUpvote = () => {
    if (!userId || !username) {
      toast.error('로그인이 필요합니다', {
        duration: 2000,
        position: 'top-center',
      });
      return;
    }

    if (hasUpvoted) {
      toast.info('이미 업보트를 하셨습니다!', {
        duration: 2000,
        position: 'top-center',
      });
      return;
    }

    if (!laboratoryId) return;

    upvoteMutate({
      user_id: userId.toString(),
      username,
      laboratory_id: laboratoryId,
    });
  };

  return (
    <div className={containerStyle}>
      <header className={headerStyle}>
        <div className={headerTopStyle}>
          <div>
            {showBackButton && (
              <button onClick={() => router.back()} className={backButtonStyle}>
                <ArrowLeft className={arrowIconStyle} />
                <span>돌아가기</span>
              </button>
            )}
          </div>
        </div>

        <div className={headerContentStyle}>
          <Flex justify="space-between" align="center">
            <div className={titleContainerStyle}>
              <span className={experimentBadgeStyle}>🧪 실험실</span>
              <h1 className={titleStyle}>{title}</h1>
            </div>
            {laboratoryId && (
              <button
                className={upvoteButtonStyle}
                onClick={handleUpvote}
                disabled={isUpvoting || hasUpvoted}
                data-upvoted={hasUpvoted}
              >
                <Heart className={hasUpvoted ? heartFilledStyle : heartStyle} />
                <span className={upvoteTextStyle}>{hasUpvoted ? '업보트 완료' : '업보트'}</span>
                {typeof upvoteCount === 'number' && upvoteCount > 0 && (
                  <span className={upvoteCountBadgeStyle}>{upvoteCount}</span>
                )}
              </button>
            )}
          </Flex>
          {description && <p className={descriptionStyle}>{description}</p>}
        </div>
      </header>

      <main className={mainStyle}>{children}</main>
    </div>
  );
}

const containerStyle = css({
  maxWidth: '1400px',
  margin: '0 auto',
});

const headerStyle = css({
  marginBottom: '16px',
  animation: 'fadeIn 0.6s ease-out',
});

const headerTopStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '20px',
  gap: '16px',
});

const backButtonStyle = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  padding: '10px 16px',
  borderRadius: '12px',
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  color: 'white.white_100',
  fontSize: '14px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.3s ease',

  '&:hover': {
    background: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateX(-4px)',
  },
});

const arrowIconStyle = css({
  width: '18px',
  height: '18px',
});

const headerContentStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

const titleContainerStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  flexWrap: 'wrap',
});

const experimentBadgeStyle = css({
  fontSize: '14px',
  fontWeight: 'bold',
  padding: '6px 14px',
  borderRadius: '12px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  whiteSpace: 'nowrap',
  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  boxShadow: '0 0 20px rgba(102, 126, 234, 0.5)',
});

const titleStyle = css({
  textStyle: 'glyph24.bold',
  color: 'white.white_100',
  lineHeight: '1.2',

  '@media (min-width: 768px)': {
    textStyle: 'glyph28.bold',
  },
});

const descriptionStyle = css({
  textStyle: 'glyph14.regular',
  color: 'white.white_75',
  maxWidth: '800px',
});

const mainStyle = css({
  position: 'relative',
});

const upvoteButtonStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '12px 20px',
  borderRadius: '12px',
  background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  color: 'white.white_100',
  fontSize: '14px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',

  '&:hover:not(:disabled)': {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderColor: 'transparent',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
  },

  '&:active:not(:disabled)': {
    transform: 'translateY(0)',
  },

  '&[data-upvoted="true"]': {
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    borderColor: 'transparent',
    cursor: 'default',
    boxShadow: '0 4px 12px rgba(240, 147, 251, 0.3)',
  },

  '&:disabled': {
    opacity: 0.7,
    cursor: 'not-allowed',
  },
});

const heartStyle = css({
  width: '18px',
  height: '18px',
  strokeWidth: '2',
  transition: 'all 0.3s ease',
});

const heartFilledStyle = css({
  width: '18px',
  height: '18px',
  fill: 'currentColor',
  strokeWidth: '2',
  animation: 'heartbeat 1s ease-in-out',
});

const upvoteTextStyle = css({
  fontWeight: '600',
  whiteSpace: 'nowrap',
});

const upvoteCountBadgeStyle = css({
  fontSize: '12px',
  fontWeight: 'bold',
  padding: '2px 8px',
  borderRadius: '8px',
  background: 'rgba(255, 255, 255, 0.2)',
  color: 'white',
  minWidth: '24px',
  textAlign: 'center',
});
