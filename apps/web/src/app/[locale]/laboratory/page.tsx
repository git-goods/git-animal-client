'use client';

import { cn } from '@gitanimals/ui-tailwind';
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
    <div className="p-6 max-w-[1200px] mx-auto pb-20">
      <header className="text-center mb-10 animate-fade-in">
        <h1 className="font-product text-glyph-36 font-bold mb-3 bg-gradient-to-r from-[#016EDB] via-[#16B7CD] to-[#5CCA69] bg-clip-text text-transparent">
          🧪 실험실
        </h1>
        <p className="text-base text-white">새로운 기능을 먼저 경험하고 피드백을 남겨주세요</p>
      </header>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
    <Link
      href={item.href}
      className={cn(
        'relative p-6 flex flex-col gap-2 rounded-[20px] cursor-pointer overflow-hidden',
        'bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-[10px]',
        'border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)]',
        'transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
        'before:content-[""] before:absolute before:top-0 before:left-0 before:right-0 before:h-px',
        'before:bg-gradient-to-r before:from-[#016EDB] before:via-[#16B7CD] before:to-[#5CCA69]',
        'before:opacity-0 before:transition-opacity before:duration-300',
        'hover:-translate-y-0.5 hover:scale-[1.02]',
        'hover:shadow-[0_20px_40px_rgba(82,209,109,0.3)]',
        'hover:border-[rgba(82,209,109,0.5)]',
        'hover:before:opacity-100',
        'active:-translate-y-1 active:scale-[1.01]'
      )}
    >
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex justify-between items-start gap-2">
          <h2 className="font-product text-glyph-18 font-bold text-white flex-1">{item.title}</h2>
          <div
            className={cn(
              'text-xs font-bold px-3 py-1 rounded-xl text-white whitespace-nowrap animate-pulse',
              'bg-gradient-to-r from-[#016EDB] via-[#16B7CD] to-[#5CCA69]',
              'shadow-[0_0_20px_rgba(82,209,109,0.5)]'
            )}
          >
            실험중
          </div>
        </div>
        <p className="font-product text-glyph-14 text-white/75">{item.description}</p>
      </div>

      <div className="flex justify-end pt-2 border-t border-white/5">
        <button
          className={cn(
            'flex items-center gap-2 px-4 py-2.5 rounded-xl',
            'bg-white/5 border border-white/10 text-white',
            'text-sm font-semibold cursor-pointer transition-all duration-300',
            'hover:bg-gradient-to-r hover:from-[#016EDB] hover:to-[#16B7CD]',
            'hover:border-transparent hover:scale-[1.03]',
            'hover:shadow-[0_4px_12px_rgba(82,209,109,0.5)]',
            'active:scale-[0.98]',
            'data-[upvoted=true]:bg-gradient-to-r data-[upvoted=true]:from-[#d9b9f9] data-[upvoted=true]:to-[#e56997]',
            'data-[upvoted=true]:border-transparent data-[upvoted=true]:cursor-default',
            'disabled:opacity-70 disabled:cursor-not-allowed'
          )}
          onClick={handleUpvote}
          disabled={isUpvoting || hasUpvoted}
          data-upvoted={hasUpvoted}
        >
          <Heart
            className={cn(
              'w-[18px] h-[18px] stroke-2 transition-all duration-300',
              hasUpvoted && 'fill-current animate-[heartbeat_1s_ease-in-out]'
            )}
          />
          <span className="font-semibold">{hasUpvoted ? '업보트 완료' : '업보트'}</span>
          {typeof upvoteCount === 'number' && upvoteCount > 0 && (
            <span className="text-[13px] font-bold px-2 py-0.5 rounded-lg bg-white/15 text-white">{upvoteCount}</span>
          )}
        </button>
      </div>
    </Link>
  );
}
