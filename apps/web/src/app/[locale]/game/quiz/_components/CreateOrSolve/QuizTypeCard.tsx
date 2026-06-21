import Image from 'next/image';
import { cn } from '@gitanimals/ui-tailwind';

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
        'relative flex items-center gap-[12px] w-full p-[40px_24px] bg-white-25 rounded-[10px]',
        isDisabled && 'pointer-events-none',
      )}
      onClick={onClick}
      disabled={isDisabled}
    >
      <Image
        className={cn('flex-shrink-0', isDisabled && 'opacity-40 [filter:grayscale(1)]')}
        src={image}
        alt={title}
        width={100}
        height={100}
      />
      <div className={cn('flex flex-col gap-[4px]', isDisabled && 'opacity-40 [filter:grayscale(1)]')}>
        <h4 className="glyph18-bold font-['Product_Sans'] font-bold text-white text-left">{title}</h4>
        <p className="glyph14-regular font-['Product_Sans'] font-normal text-white-50 [word-break:keep-all] text-left">
          {description}
        </p>
      </div>
      <p
        className={
          isDisabled && disabledLabel
            ? 'absolute top-[8px] right-[8px] p-[2px_12px] bg-white-50 rounded-full glyph12-regular font-bold text-white'
            : 'absolute top-[8px] right-[8px] p-[2px_12px] bg-black-25 rounded-full glyph12-regular font-normal text-white-75'
        }
      >
        {isDisabled && disabledLabel ? disabledLabel : point}
      </p>
    </button>
  );
};

export default QuizTypeCard;
