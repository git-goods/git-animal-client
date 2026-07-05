'use client';

import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
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
      <header className="mb-[16px] animate-[fadeIn_0.6s_ease-out]">
        <div className="flex justify-between items-start mb-[12px] gap-[16px]">
          <div>
            {showBackButton && (
              <button onClick={() => router.back()} className={backButtonStyle}>
                <ArrowLeft className="w-[18px] h-[18px]" />
                <span>돌아가기</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-[12px]">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-[12px] flex-wrap">
              <span className={experimentBadgeStyle}>🧪 실험실</span>
              <h1 className="glyph22-bold text-white-100 leading-[1.2] [@media(min-width:768px)]:glyph24-bold">
                {title}
              </h1>
            </div>
            {laboratoryId && (
              <button
                className={upvoteButtonStyle}
                onClick={handleUpvote}
                disabled={isUpvoting || hasUpvoted}
                data-upvoted={hasUpvoted}
              >
                <Heart className={hasUpvoted ? heartFilledStyle : heartStyle} />
                <span className="font-semibold whitespace-nowrap">{hasUpvoted ? '업보트 완료' : '업보트'}</span>
                {typeof upvoteCount === 'number' && upvoteCount > 0 && (
                  <span className="text-[12px] font-bold p-[2px_8px] rounded-[8px] bg-[rgba(255,255,255,0.2)] text-white min-w-[24px] text-center">
                    {upvoteCount}
                  </span>
                )}
              </button>
            )}
          </div>
          {description && <p className="glyph14-regular text-white-75 max-w-[800px]">{description}</p>}
        </div>
      </header>

      <main className="relative">{children}</main>
    </div>
  );
}

const backButtonStyle =
  'inline-flex items-center gap-[8px] p-[4px_12px] rounded-[8px] bg-[rgba(255,255,255,0.05)] border border-solid border-[rgba(255,255,255,0.1)] text-white-100 glyph12-regular cursor-pointer transition-all duration-300 ease-[ease] ' +
  'hover:bg-[rgba(255,255,255,0.1)] hover:[transform:translateX(-4px)]';

const experimentBadgeStyle =
  'glyph12-bold p-[4px_8px] rounded-[8px] bg-[linear-gradient(135deg,_#667eea_0%,_#764ba2_100%)] text-white-100 whitespace-nowrap animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite] shadow-[0_0_20px_rgba(102,126,234,0.5)]';

const upvoteButtonStyle =
  'flex items-center gap-[8px] p-[4px_12px] rounded-[8px] bg-[linear-gradient(145deg,_rgba(255,255,255,0.1),_rgba(255,255,255,0.05))] border border-solid border-[rgba(255,255,255,0.2)] text-white-100 glyph12-regular cursor-pointer transition-all duration-300 ease-[ease] shadow-[0_4px_12px_rgba(0,0,0,0.1)] ' +
  'hover:not-disabled:bg-[linear-gradient(135deg,_#667eea_0%,_#764ba2_100%)] hover:not-disabled:border-transparent hover:not-disabled:[transform:translateY(-2px)] hover:not-disabled:shadow-[0_6px_20px_rgba(102,126,234,0.4)] ' +
  'active:not-disabled:[transform:translateY(0)] ' +
  'data-[upvoted=true]:bg-[linear-gradient(135deg,_#f093fb_0%,_#f5576c_100%)] data-[upvoted=true]:border-transparent data-[upvoted=true]:cursor-default data-[upvoted=true]:shadow-[0_4px_12px_rgba(240,147,251,0.3)] ' +
  'disabled:opacity-70 disabled:cursor-not-allowed';

const heartStyle = 'w-[18px] h-[18px] [stroke-width:2] transition-all duration-300 ease-[ease]';

const heartFilledStyle = 'w-[18px] h-[18px] fill-current [stroke-width:2] animate-[heartbeat_1s_ease-in-out]';
