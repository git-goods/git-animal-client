import Image from 'next/image';
import { css } from '_panda/css';
import { Flex } from '_panda/jsx';
import { Button } from '@gitanimals/ui-panda';

import { QUIZ_STATUS } from '@/app/[locale]/quiz/solve/solveQuiz.constants';
import { useSolveQuizContext } from '@/app/[locale]/quiz/solve/SolveQuizContext';
import Radio from '@/components/Radio';
import useRadio from '@/components/Radio/useRadio';

const SelectCategorySection = () => {
  const {
    radioItemProps: categoryRadioItemProps,
    selected: selectedCategory,
    handleChange: handleChangeCategory,
  } = useRadio({
    options: [
      { label: 'Frontend', value: 'frontend' },
      { label: 'Backend', value: 'backend' },
    ],
  });

  const { setStatus } = useSolveQuizContext();

  const handleStart = () => {
    setStatus(QUIZ_STATUS.SOLVING);
  };

  return (
    <div className={containerStyle}>
      <div className={contentContainerStyle}>
        <h1 className={titleStyle}>Category</h1>
        <h2 className={descriptionStyle}>Choose the category of the quiz</h2>
        <Radio value={selectedCategory} onValueChange={handleChangeCategory}>
          {categoryRadioItemProps.map((radioItem) => {
            const isSelected = radioItem.value === selectedCategory;
            const imageSrc = isSelected ? `/quiz/cursor-choiced.webp` : `/quiz/cursor-unchoiced.webp`;
            return (
              <Radio.Button key={radioItem.value} className={radioButtonStyle} value={radioItem.value}>
                <Flex direction="column" align="center" gap="12px">
                  <Image src={imageSrc} alt={radioItem.label} width={60} height={60} />
                  <span className={radioButtonLabelStyle}>{radioItem.label}</span>
                </Flex>
              </Radio.Button>
            );
          })}
        </Radio>
      </div>
      <div className={buttonContainerStyle}>
        <Button className={buttonStyle} onClick={handleStart}>
          Start!
        </Button>
      </div>
    </div>
  );
};

export default SelectCategorySection;

const containerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  paddingInline: '16px',
  backgroundColor: 'gray.gray_050',
});

const titleStyle = css({
  textStyle: 'glyph40.bold',
  fontFamily: 'Product Sans',
  fontWeight: 700,
  color: 'white',
});

const descriptionStyle = css({
  marginBottom: '60px',
  textStyle: 'body18.regular',
  fontFamily: 'Product Sans',
  fontWeight: 400,
  color: 'white.white_90',
});

const radioButtonStyle = css({
  width: '100%',
  height: '214px',
});

const radioButtonLabelStyle = css({
  textStyle: 'body18.bold',
  fontFamily: 'Product Sans',
  fontWeight: 700,
  color: 'white',
});

const contentContainerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
});

const buttonContainerStyle = css({
  width: '100%',
  paddingBlock: '8px',
});

const buttonStyle = css({
  width: '100%',
});
