import Image from 'next/image';
import { css } from '_panda/css';
import { Flex } from '_panda/jsx';
import { Button } from '@gitanimals/ui-panda';

import { QUIZ_STATUS } from '@/app/[locale]/quiz/solve/solveQuiz.constants';
import { useSolveQuizContext } from '@/app/[locale]/quiz/solve/SolveQuizContext';
import Tabs from '@/components/Tabs/Tabs';
import TabsList from '@/components/Tabs/TabsList';
import TabsTrigger from '@/components/Tabs/TabsTrigger';
import useTabs from '@/components/Tabs/useTabs';

const SelectCategorySection = () => {
  const {
    tabsTriggerProps: categoryTabsTriggerProps,
    selected: selectedCategory,
    handleChange: handleChangeCategory,
  } = useTabs({
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
        <Tabs value={selectedCategory} onValueChange={handleChangeCategory}>
          <TabsList>
            {categoryTabsTriggerProps.map((tabsTriggerItem) => {
              const { value, label } = tabsTriggerItem;
              const isSelected = value === selectedCategory;
              const imageSrc = isSelected ? `/quiz/cursor-choiced.webp` : `/quiz/cursor-unchoiced.webp`;
              return (
                <TabsTrigger key={value} value={value} className={tabsTriggerStyle}>
                  <Flex direction="column" align="center" gap="12px">
                    <Image src={imageSrc} alt={label} width={60} height={60} />
                    <span className={tabsTriggerLabelStyle}>{label}</span>
                  </Flex>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
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

const tabsTriggerStyle = css({
  width: '100%',
  height: '214px',
});

const tabsTriggerLabelStyle = css({
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
