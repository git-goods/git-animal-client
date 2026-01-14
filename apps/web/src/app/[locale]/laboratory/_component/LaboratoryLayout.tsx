'use client';

import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@gitanimals/ui-tailwind';
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
    <div className="max-w-[1400px] mx-auto">
      <header className="mb-4 animate-fade-in">
        <div className="flex justify-between items-start mb-3 gap-4">
          <div>
            {showBackButton && (
              <button
                onClick={() => router.back()}
                className={cn(
                  'inline-flex items-center gap-2 px-3 py-1 rounded-lg',
                  'bg-white/5 border border-white/10',
                  'text-white font-product text-glyph-12 cursor-pointer',
                  'transition-all duration-300',
                  'hover:bg-white/10 hover:-translate-x-1'
                )}
              >
                <ArrowLeft className="w-[18px] h-[18px]" />
                <span>돌아가기</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className={cn(
                  'font-product text-glyph-12 font-bold px-2 py-1 rounded-lg',
                  'bg-gradient-to-r from-[#667eea] to-[#764ba2]',
                  'text-white whitespace-nowrap animate-pulse',
                  'shadow-[0_0_20px_rgba(102,126,234,0.5)]'
                )}
              >
                🧪 실험실
              </span>
              <h1 className="font-product text-glyph-22 font-bold text-white leading-tight md:text-glyph-24">{title}</h1>
            </div>
            {laboratoryId && (
              <button
                className={cn(
                  'flex items-center gap-2 px-3 py-1 rounded-lg',
                  'bg-gradient-to-br from-white/10 to-white/5',
                  'border border-white/20 text-white font-product text-glyph-12',
                  'cursor-pointer transition-all duration-300',
                  'shadow-[0_4px_12px_rgba(0,0,0,0.1)]',
                  'hover:bg-gradient-to-r hover:from-[#667eea] hover:to-[#764ba2]',
                  'hover:border-transparent hover:-translate-y-0.5',
                  'hover:shadow-[0_6px_20px_rgba(102,126,234,0.4)]',
                  'active:translate-y-0',
                  'data-[upvoted=true]:bg-gradient-to-r data-[upvoted=true]:from-[#f093fb] data-[upvoted=true]:to-[#f5576c]',
                  'data-[upvoted=true]:border-transparent data-[upvoted=true]:cursor-default',
                  'data-[upvoted=true]:shadow-[0_4px_12px_rgba(240,147,251,0.3)]',
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
                <span className="font-semibold whitespace-nowrap">{hasUpvoted ? '업보트 완료' : '업보트'}</span>
                {typeof upvoteCount === 'number' && upvoteCount > 0 && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-white/20 text-white min-w-6 text-center">
                    {upvoteCount}
                  </span>
                )}
              </button>
            )}
          </div>
          {description && <p className="font-product text-glyph-14 text-white/75 max-w-[800px]">{description}</p>}
        </div>
      </header>

      <main className="relative">{children}</main>
    </div>
  );
}
