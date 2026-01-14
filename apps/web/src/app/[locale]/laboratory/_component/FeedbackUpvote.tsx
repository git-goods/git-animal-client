'use client';

import { cn } from '@gitanimals/ui-tailwind';
import { Button } from '@gitanimals/ui-tailwind';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowUp } from 'lucide-react';
import { toast } from 'sonner';

import { createOrUpdateUpvote } from '@/apis/laboratory/feedback';
import { LABORATORY_FEEDBACK_QUERY_KEYS, upvoteQueryOptions } from '@/apis/laboratory/useLaboratoryFeedback';
import { usePathname } from '@/i18n/routing';
import { useClientUser } from '@/utils/clientAuth';

export function FeedbackUpvote() {
  const pathname = usePathname();

  const laboratoryId = pathname.split('/').pop() || 'laboratory';
  console.log('laboratoryId', laboratoryId);

  const queryClient = useQueryClient();
  const { id: userId, name: username } = useClientUser();

  // Check if user has already upvoted for this laboratory
  const { data: checkData, isLoading: isCheckingUpvote } = useQuery({
    ...upvoteQueryOptions.checkUserUpvote(userId?.toString() ?? '', laboratoryId),
    enabled: !!userId && !!laboratoryId,
  });
  const hasUpvoted = checkData?.hasUpvoted ?? false;

  const { data: upvoteCount } = useQuery(upvoteQueryOptions.getUpvoteCount(laboratoryId));

  const { mutate: upvoteMutate, isPending: isUpvoting } = useMutation({
    mutationFn: createOrUpdateUpvote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LABORATORY_FEEDBACK_QUERY_KEYS.all });
      toast.success('업보트가 등록되었습니다! 감사합니다 🎉', {
        duration: 3000,
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

    upvoteMutate({
      user_id: userId.toString(),
      username,
      laboratory_id: laboratoryId,
    });
  };

  if (isCheckingUpvote) {
    return null;
  }

  if (laboratoryId === 'laboratory') {
    return null;
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t border-white/10 py-4 px-6 z-10 bg-gray-150">
      <div
        className={cn(
          'mx-auto flex flex-col gap-3 items-center',
          'md:flex-row md:justify-start'
        )}
      >
        <p className="text-white text-sm leading-relaxed flex-1 text-center md:text-left">
          실험실 기능이 마음에 드셨나요? 정식 출시를 원하시면 업보트를 눌러주세요!
          {typeof upvoteCount === 'number' && (
            <span className="text-brand-sky font-bold ml-2"> ({upvoteCount}명이 업보트했어요)</span>
          )}
        </p>

        <Button
          className="min-w-[120px] font-bold flex items-center justify-center gap-1"
          onClick={handleUpvote}
          disabled={isUpvoting || hasUpvoted}
          size="s"
        >
          <ArrowUp width={20} height={20} />
          {hasUpvoted ? '업보트 완료' : '업보트'}
        </Button>
      </div>
    </footer>
  );
}
