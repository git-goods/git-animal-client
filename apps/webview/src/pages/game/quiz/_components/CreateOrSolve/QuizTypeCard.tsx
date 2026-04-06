import { cn } from '@gitanimals/ui-tailwind/utils';

interface QuizTypeCardProps {
  title: string;
  description: string;
  image: string;
  point: string;
  onClick: () => void;
  isDisabled?: boolean;
  disabledLabel?: string;
}

const QuizTypeCard = ({ title, description, image, point, onClick, isDisabled, disabledLabel }: QuizTypeCardProps) => {
  return (
    <button
      className={cn(
        'relative flex w-full items-center gap-3 rounded-[10px] bg-white/25 px-6 py-10',
        isDisabled && 'pointer-events-none',
      )}
      onClick={onClick}
      disabled={isDisabled}
    >
      <img
        className={cn('shrink-0', isDisabled && 'opacity-40 grayscale')}
        src={image}
        alt={title}
        width={100}
        height={100}
      />
      <div className={cn('flex flex-col gap-1', isDisabled && 'opacity-40 grayscale')}>
        <h4 className="text-left font-product text-glyph-18 font-bold text-white">{title}</h4>
        <p className="break-keep text-left font-product text-glyph-14 font-normal text-white/50">{description}</p>
      </div>
      <p
        className={cn(
          'absolute right-2 top-2 rounded-full px-3 py-0.5 font-product text-glyph-12',
          isDisabled && disabledLabel
            ? 'bg-white/50 font-bold text-white'
            : 'bg-black/25 font-normal text-white/75',
        )}
      >
        {isDisabled && disabledLabel ? disabledLabel : point}
      </p>
    </button>
  );
};

export default QuizTypeCard;
