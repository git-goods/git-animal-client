'use client';

import { useState } from 'react';
import { css } from '_panda/css';
import { Button } from '@gitanimals/ui-panda';
import { toast } from 'sonner';

import {
  useCheckUserFeedback,
  useCreateLaboratoryFeedback,
  useGetFeedbackCount,
} from '@/apis/laboratory/useLaboratoryFeedback';
import { useClientUser } from '@/utils/clientAuth';

export function FeedbackUpvote() {
  const { id: userId, name: username } = useClientUser();
  const [description, setDescription] = useState('');
  const [showTextarea, setShowTextarea] = useState(false);

  // Check if user has already upvoted
  const { data: checkData, isLoading: isCheckingUpvote } = useCheckUserFeedback(userId?.toString());
  const hasUpvoted = checkData?.hasUpvoted ?? false;

  // Get total upvote count
  const { data: feedbackCount } = useGetFeedbackCount();

  // Mutation for upvoting
  const { mutate: upvoteMutate, isPending: isUpvoting } = useCreateLaboratoryFeedback({
    onSuccess: () => {
      toast.success('정식 출시 의견이 등록되었습니다! 감사합니다 🎉', {
        duration: 3000,
        position: 'top-center',
      });
      setShowTextarea(false);
      setDescription('');
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
      toast.info('이미 의견을 남기셨습니다!', {
        duration: 2000,
        position: 'top-center',
      });
      return;
    }

    if (!showTextarea) {
      setShowTextarea(true);
      return;
    }

    upvoteMutate({
      user_id: userId.toString(),
      username,
      description: description || undefined,
    });
  };

  if (isCheckingUpvote) {
    return null;
  }

  return (
    <footer className={footerStyle}>
      <div className={contentStyle}>
        <p className={messageStyle}>
          실험실 기능이 마음에 드셨나요? 정식 출시를 원하시면 피드백을 남겨주세요!
          {typeof feedbackCount === 'number' && (
            <span className={countStyle}> ({feedbackCount}명이 응원하고 있어요)</span>
          )}
        </p>

        {showTextarea && !hasUpvoted && (
          <textarea
            className={textareaStyle}
            placeholder="추가로 남기고 싶은 의견이 있다면 작성해주세요 (선택사항)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        )}

        <Button
          className={buttonStyle}
          onClick={handleUpvote}
          disabled={isUpvoting || hasUpvoted}
          size="s"
        >
          {hasUpvoted ? '✅ 의견 남김' : showTextarea ? '제출하기' : 'UP!!'}
        </Button>

        {showTextarea && !hasUpvoted && (
          <button
            className={cancelButtonStyle}
            onClick={() => {
              setShowTextarea(false);
              setDescription('');
            }}
          >
            취소
          </button>
        )}
      </div>
    </footer>
  );
}

const footerStyle = css({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  background: 'rgba(26, 26, 46, 0.95)',
  backdropFilter: 'blur(8px)',
  borderTop: '1px solid',
  borderColor: 'gray.gray_200',
  padding: '16px 24px',
  zIndex: 10,
});

const contentStyle = css({
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  alignItems: 'center',
  '@media (min-width: 768px)': {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const messageStyle = css({
  color: 'white.white_100',
  fontSize: '14px',
  lineHeight: '1.5',
  flex: 1,
  textAlign: 'center',
  '@media (min-width: 768px)': {
    textAlign: 'left',
  },
});

const countStyle = css({
  color: 'brand.sky',
  fontWeight: 'bold',
  marginLeft: '8px',
});

const textareaStyle = css({
  width: '100%',
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid',
  borderColor: 'gray.gray_300',
  background: 'gray.gray_100',
  color: 'white.white_100',
  fontSize: '14px',
  resize: 'vertical',
  minHeight: '80px',
  outline: 'none',
  '&:focus': {
    borderColor: 'brand.sky',
  },
});

const buttonStyle = css({
  minWidth: '120px',
  fontWeight: 'bold',
  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
});

const cancelButtonStyle = css({
  padding: '8px 16px',
  fontSize: '14px',
  color: 'gray.gray_400',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  '&:hover': {
    color: 'white.white_100',
  },
});
