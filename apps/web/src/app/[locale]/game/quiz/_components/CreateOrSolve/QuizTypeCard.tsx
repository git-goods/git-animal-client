import Image from 'next/image';
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
        'relative flex items-center gap-3 w-full p-[40px_24px] bg-white-25 rounded-[10px]',
        isDisabled && 'pointer-events-none',
      )}
      onClick={onClick}
      disabled={isDisabled}
    >
      <Image
        className={cn('flex-shrink-0', isDisabled && 'opacity-40 grayscale')}
        src={image}
        alt={title}
        width={100}
        height={100}
      />
      <div className={cn('flex flex-col gap-1', isDisabled && 'opacity-40 grayscale')}>
        <h4 className="font-product text-glyph-18 font-bold text-white text-left">{title}</h4>
        <p className="font-product text-glyph-14 font-normal text-white-50 break-keep text-left">{description}</p>
      </div>
      <p
        className={cn(
          'absolute top-2 right-2 p-[2px_12px] rounded-full font-product text-glyph-12',
          isDisabled && disabledLabel
            ? 'bg-white-50 font-bold text-white'
            : 'bg-black-25 font-normal text-white-75',
        )}
      >
        {isDisabled && disabledLabel ? disabledLabel : point}
      </p>
    </button>
  );
};

export default QuizTypeCard;
