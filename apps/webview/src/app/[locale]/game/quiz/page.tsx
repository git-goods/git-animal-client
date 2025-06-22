'use client';

import { useTranslations } from 'next-intl';
import { css } from '_panda/css';

import { Background } from '@/app/[locale]/game/quiz/_components/BackGround';

import SelectQuizType from './_components/CreateOrSolve/SelectQuizType';

function QuizPage() {
  const t = useTranslations('Quiz');

  return (
    <>
      <Background widthBottom />
      <div className={containerStyle}>
        <h1 className={titleStyle}>Quiz</h1>
        <h2 className={descriptionStyle}>{t('quiz-solve-description')}</h2>
        <SelectQuizType />
      </div>
    </>
  );
}

export default QuizPage;

const containerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  padding: '40px 16px',
});

const titleStyle = css({
  marginBottom: '8px',
  textStyle: 'glyph40.bold',
  fontFamily: 'Product Sans',
  fontWeight: 700,
  color: 'white',
});

const descriptionStyle = css({
  marginBottom: '48px',
  textStyle: 'glyph18.regular',
  fontFamily: 'Product Sans',
  fontWeight: 400,
  color: 'white.white_90',
});
