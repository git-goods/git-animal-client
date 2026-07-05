'use client';

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
    <div className="p-[24px] max-w-[1200px] mx-auto pb-[80px]">
      <header className="text-center mb-[40px] animate-[fadeIn_0.6s_ease-out]">
        <h1 className="glyph36-bold mb-[12px] bg-[linear-gradient(150.51deg,_#016EDB_11.25%,_#16B7CD_61.95%,_#5CCA69_94.01%)] bg-clip-text text-transparent">
          🧪 실험실
        </h1>
        <p className="text-[16px] text-white-100">새로운 기능을 먼저 경험하고 피드백을 남겨주세요</p>
      </header>
      <div className="grid grid-cols-[1fr] gap-[24px] [@media(min-width:768px)]:grid-cols-[repeat(2,_1fr)]">
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
      <div className="flex-1 flex flex-col gap-[8px]">
        <div className="flex justify-between items-start gap-[8px]">
          <h2 className="glyph18-bold text-white-100 flex-1">{item.title}</h2>
          <div className={badgeStyle}>실험중</div>
        </div>
        <p className="glyph14-regular text-white-75">{item.description}</p>
      </div>

      <div className="flex justify-end pt-[8px] border-t border-solid border-[rgba(255,255,255,0.05)]">
        <button
          className={upvoteButtonStyle}
          onClick={handleUpvote}
          disabled={isUpvoting || hasUpvoted}
          data-upvoted={hasUpvoted}
        >
          <Heart className={hasUpvoted ? heartFilledStyle : heartStyle} />
          <span className="font-semibold">{hasUpvoted ? '업보트 완료' : '업보트'}</span>
          {typeof upvoteCount === 'number' && upvoteCount > 0 && (
            <span className="text-[13px] font-bold p-[2px_8px] rounded-[8px] bg-[rgba(255,255,255,0.15)] text-white">
              {upvoteCount}
            </span>
          )}
        </button>
      </div>
    </Link>
  );
}

const cardStyle =
  'relative bg-[linear-gradient(145deg,_rgba(255,255,255,0.1),_rgba(255,255,255,0.05))] backdrop-blur-[10px] rounded-[20px] p-[24px] flex flex-col gap-[8px] border border-solid border-[rgba(255,255,255,0.1)] shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer overflow-hidden ' +
  'before:content-[""] before:absolute before:top-0 before:left-0 before:right-0 before:h-[1px] before:bg-[linear-gradient(150.51deg,_#016EDB_11.25%,_#16B7CD_61.95%,_#5CCA69_94.01%)] before:opacity-0 before:transition-[opacity] before:duration-300 before:ease-[ease] ' +
  'hover:[transform:translateY(-2px)_scale(1.02)] hover:shadow-[0_20px_40px_rgba(82,209,109,0.3)] hover:border-[rgba(82,209,109,0.5)] hover:before:opacity-100 ' +
  'active:[transform:translateY(-4px)_scale(1.01)]';

const badgeStyle =
  'text-[12px] font-bold p-[4px_12px] rounded-[12px] bg-[linear-gradient(150.51deg,_#016EDB_11.25%,_#16B7CD_61.95%,_#5CCA69_94.01%)] text-white whitespace-nowrap animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite] shadow-[0_0_20px_rgba(82,209,109,0.5)]';

const upvoteButtonStyle =
  'flex items-center gap-[8px] p-[10px_16px] rounded-[12px] bg-[rgba(255,255,255,0.05)] border border-solid border-[rgba(255,255,255,0.1)] text-white-100 text-[14px] font-semibold cursor-pointer transition-all duration-300 ease-[ease] ' +
  'hover:not-disabled:bg-[linear-gradient(135deg,_#016EDB_0%,_#16B7CD_100%)] hover:not-disabled:border-transparent hover:not-disabled:[transform:scale(1.03)] hover:not-disabled:shadow-[0_4px_12px_rgba(82,209,109,0.5)] ' +
  'active:not-disabled:[transform:scale(0.98)] ' +
  'data-[upvoted=true]:bg-[linear-gradient(135deg,_#d9b9f9_0%,_#e56997_100%)] data-[upvoted=true]:border-transparent data-[upvoted=true]:cursor-default ' +
  'disabled:opacity-70 disabled:cursor-not-allowed';

const heartStyle = 'w-[18px] h-[18px] [stroke-width:2] transition-all duration-300 ease-[ease]';

const heartFilledStyle = 'w-[18px] h-[18px] fill-current [stroke-width:2] animate-[heartbeat_1s_ease-in-out]';
