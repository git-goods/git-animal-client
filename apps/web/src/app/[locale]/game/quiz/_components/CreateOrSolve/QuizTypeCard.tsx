import Image from 'next/image';
import { cn } from '@gitanimals/ui-tailwind';

interface QuizTypeCardProps {
  title: string;
  description: string;
  image: string;
  point: string;
  onClick: () => void;
  isDisabled?: boolean;
}

const QuizTypeCard = ({ title, description, image, point, onClick, isDisabled }: QuizTypeCardProps) => {
  return (
    <button
      className={cn(
        'relative flex items-center gap-3 w-full p-[40px_24px] bg-white-25 rounded-[10px]',
        isDisabled && 'opacity-50 pointer-events-none',
      )}
      onClick={onClick}
      disabled={isDisabled}
    >
      <Image className="flex-shrink-0" src={image} alt={title} width={100} height={100} />
      <div className="flex flex-col gap-1">
        <h4 className="font-product text-glyph-18 font-bold text-white text-left">{title}</h4>
        <p className="font-product text-glyph-14 font-normal text-white-50 break-keep text-left">{description}</p>
      </div>
      <p className="absolute top-2 right-2 p-[2px_12px] bg-black-25 rounded-full font-product text-glyph-12 font-normal text-white-75">
        {point}
      </p>
    </button>
  );
};

export default QuizTypeCard;
