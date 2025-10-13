'use client';

import { css } from '_panda/css';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';

import { createOrUpdateUpvote } from '@/apis/laboratory/feedback';
import { LABORATORY_FEEDBACK_QUERY_KEYS, upvoteQueryOptions } from '@/apis/laboratory/useLaboratoryFeedback';
import { Link } from '@/i18n/routing';
import { useClientUser } from '@/utils/clientAuth';

// Note: This is now a client component, metadata should be handled at layout level if needed

interface LaboratoryItem {
  id: string;
  title: string;
  description: string;
  href: string;
}

const list: LaboratoryItem[] = [
  {
    id: 'property-pet-sell',
    title: '레벨, 타입 같은 펫 한번에 팔기',
    description: '펫 레벨, 타입 등 펫 속성을 선택하여 한번에 팔 수 있어요.',
    href: '/laboratory/property-pet-sell',
  },
  {
    id: 'multi-merge',
    title: '펫 합치기',
    description: '펫을 선택하여 한번에 합칠 수 있어요.',
    href: '/laboratory/multi-merge',
  },
];

export default function LaboratoryPage() {
  return (
    <div className={containerStyle}>
      <header className={headerStyle}>
        <h1 className={titleStyle}>🧪 실험실</h1>
        <p className={subtitleStyle}>새로운 기능을 먼저 경험하고 피드백을 남겨주세요</p>
      </header>
      <div className={contentStyle}>
        {list.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

function Card({ item }: { item: LaboratoryItem }) {
  const queryClient = useQueryClient();
  const { id: userId, name: username } = useClientUser();

  const { data: checkData } = useQuery({
    ...upvoteQueryOptions.checkUserUpvote(userId?.toString() ?? '', item.id),
    enabled: !!userId && !!item.id,
  });
  const hasUpvoted = checkData?.hasUpvoted ?? false;

  const { data: upvoteCount } = useQuery(upvoteQueryOptions.getUpvoteCount(item.id));

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

  const handleUpvote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

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

    upvoteMutate({
      user_id: userId.toString(),
      username,
      laboratory_id: item.id,
    });
  };

  return (
    <Link href={item.href} className={cardStyle}>
      <div className={cardContentStyle}>
        <div className={cardHeaderStyle}>
          <h2 className={cardTitleStyle}>{item.title}</h2>
          <div className={badgeStyle}>실험중</div>
        </div>
        <p className={cardDescriptionStyle}>{item.description}</p>
      </div>

      <div className={cardFooterStyle}>
        <button
          className={upvoteButtonStyle}
          onClick={handleUpvote}
          disabled={isUpvoting || hasUpvoted}
          data-upvoted={hasUpvoted}
        >
          <Heart className={hasUpvoted ? heartFilledStyle : heartStyle} />
          <span className={upvoteTextStyle}>{hasUpvoted ? '업보트 완료' : '업보트'}</span>
          {typeof upvoteCount === 'number' && upvoteCount > 0 && (
            <span className={upvoteCountStyle}>{upvoteCount}</span>
          )}
        </button>
      </div>
    </Link>
  );
}

const containerStyle = css({
  padding: '24px',
  maxWidth: '1200px',
  margin: '0 auto',
  paddingBottom: '80px',
});

const headerStyle = css({
  textAlign: 'center',
  marginBottom: '40px',
  animation: 'fadeIn 0.6s ease-out',
});

const titleStyle = css({
  textStyle: 'glyph36.bold',
  marginBottom: '12px',
  backgroundImage: 'linear-gradient(150.51deg, #016EDB 11.25%, #16B7CD 61.95%, #5CCA69 94.01%)',
  backgroundClip: 'text',
  color: 'transparent',
});

const subtitleStyle = css({
  fontSize: '16px',
  color: 'white.white_100',
});

const contentStyle = css({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '24px',
  '@media (min-width: 768px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
});

const cardStyle = css({
  position: 'relative',
  background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
  backdropFilter: 'blur(10px)',
  borderRadius: '20px',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  overflow: 'hidden',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',

    background: 'linear-gradient(150.51deg, #016EDB 11.25%, #16B7CD 61.95%, #5CCA69 94.01%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },

  _hover: {
    transform: 'translateY(-2px) scale(1.02)',
    // 초록
    boxShadow: '0 20px 40px rgba(82, 209, 109, 0.3)',
    borderColor: 'rgba(82, 209, 109, 0.5)',

    '&::before': {
      opacity: 1,
    },
  },

  _active: {
    transform: 'translateY(-4px) scale(1.01)',
  },
});

const cardContentStyle = css({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const cardHeaderStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '8px',
});

const cardTitleStyle = css({
  textStyle: 'glyph18.bold',
  color: 'white.white_100',
  flex: 1,
});

const badgeStyle = css({
  fontSize: '12px',
  fontWeight: 'bold',
  padding: '4px 12px',
  borderRadius: '12px',
  // background: linear-gradient(150.51deg, #016EDB 11.25%, #16B7CD 61.95%, #5CCA69 94.01%);

  background: 'linear-gradient(150.51deg, #016EDB 11.25%, #16B7CD 61.95%, #5CCA69 94.01%)',
  color: 'white',
  whiteSpace: 'nowrap',
  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  boxShadow: '0 0 20px rgba(82, 209, 109, 0.5)',
});

const cardDescriptionStyle = css({
  textStyle: 'glyph14.regular',
  color: 'white.white_75',
});

const cardFooterStyle = css({
  display: 'flex',
  justifyContent: 'flex-end',
  paddingTop: '8px',
  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
});

const upvoteButtonStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '10px 16px',
  borderRadius: '12px',
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  color: 'white.white_100',
  fontSize: '14px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s ease',

  '&:hover:not(:disabled)': {
    background: 'linear-gradient(135deg, #016EDB 0%, #16B7CD 100%)',
    borderColor: 'transparent',
    transform: 'scale(1.03)',
    boxShadow: '0 4px 12px rgba(82, 209, 109, 0.5)',
  },

  '&:active:not(:disabled)': {
    transform: 'scale(0.98)',
  },

  '&[data-upvoted="true"]': {
    background: 'linear-gradient(135deg, #d9b9f9 0%, #e56997 100%)',
    borderColor: 'transparent',
    cursor: 'default',
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
});

const upvoteCountStyle = css({
  fontSize: '13px',
  fontWeight: 'bold',
  padding: '2px 8px',
  borderRadius: '8px',
  background: 'rgba(255, 255, 255, 0.15)',
  color: 'white',
});
