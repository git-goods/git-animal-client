import Image from 'next/image';
import { css, cx } from '_panda/css';
import { Flex } from '_panda/jsx';

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
    <button className={cx(cardStyle, isDisabled && disabledStyle)} onClick={onClick} disabled={isDisabled}>
      <Image className={imageStyle} src={image} alt={title} width={100} height={100} />
      <Flex direction="column" gap="4px">
        <h4 className={titleStyle}>{title}</h4>
        <p className={descriptionStyle}>{description}</p>
      </Flex>
      <p className={pointStyle}>{point}</p>
    </button>
  );
};

export default QuizTypeCard;

const cardStyle = css({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  width: '100%',
  padding: '40px 24px',
  backgroundColor: 'white.white_25',
  borderRadius: '10px',
});

const disabledStyle = css({
  opacity: 0.5,
  pointerEvents: 'none',
});

const imageStyle = css({
  flexShrink: 0,
});

const titleStyle = css({
  textStyle: 'glyph18.bold',
  fontFamily: 'Product Sans',
  fontWeight: 700,
  color: 'white',
  textAlign: 'left',
});

const descriptionStyle = css({
  textStyle: 'glyph14.regular',
  fontFamily: 'Product Sans',
  fontWeight: 400,
  color: 'white.white_50',
  wordBreak: 'keep-all',
  textAlign: 'left',
});

const pointStyle = css({
  position: 'absolute',
  top: '8px',
  right: '8px',
  padding: '2px 12px',
  backgroundColor: 'black.black_25',
  borderRadius: 'full',
  textStyle: 'glyph12.regular',
  fontWeight: 400,
  color: 'white.white_75',
});
