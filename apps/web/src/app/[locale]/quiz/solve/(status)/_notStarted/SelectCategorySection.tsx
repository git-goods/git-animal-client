import React from 'react';
import Image from 'next/image';
import { css } from '_panda/css';
import { Flex } from '_panda/jsx';
import { Button } from '@gitanimals/ui-panda';

import QuizRadio from '@/app/[locale]/quiz/create/QuizRadioButton';
import useRadioGroup from '@/app/[locale]/quiz/create/useRadioGroup';

const SelectCategorySection = () => {
  const { radioItemProps: categoryRadioItemProps } = useRadioGroup({
    options: [
      { label: 'Frontend', value: 'frontend' },
      { label: 'Backend', value: 'backend' },
    ],
  });

  return (
    <div className={containerStyle}>
      <div className={contentContainerStyle}>
        <h1 className={titleStyle}>Category</h1>
        <h2 className={descriptionStyle}>Choose the category of the quiz</h2>
        <QuizRadio.Group>
          {categoryRadioItemProps.map((radioItemProps) => {
            const imageSrc = radioItemProps.selected ? `/quiz/cursor-choiced.webp` : `/quiz/cursor-unchoiced.webp`;
            return (
              <QuizRadio.Button
                key={radioItemProps.value}
                className={radioButtonStyle}
                {...radioItemProps}
                onClick={() => {
                  radioItemProps.onSelect();
                }}
              >
                <Flex direction="column" align="center" gap="12px">
                  <Image src={imageSrc} alt={radioItemProps.label} width={60} height={60} />
                  <span className={radioButtonLabelStyle}>{radioItemProps.label}</span>
                </Flex>
              </QuizRadio.Button>
            );
          })}
        </QuizRadio.Group>
      </div>
      <div className={buttonContainerStyle}>
        <Button className={buttonStyle}>Start!</Button>
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
