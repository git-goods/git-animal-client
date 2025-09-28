import { getTranslations } from 'next-intl/server';
import { css } from '_panda/css';

import { Background } from '@/app/[locale]/game/quiz/_components/BackGround';
import { parseDevModeFromSearchParams } from '@/lib/devtools/constants';

import SelectQuizType from './_components/CreateOrSolve/SelectQuizType';

async function QuizPage({ searchParams }: { searchParams: { devMode?: string } }) {
  const t = await getTranslations('Quiz');

  const isDevMode = parseDevModeFromSearchParams(searchParams.devMode ?? '');

  if (!isDevMode) {
    return null;
  }

  return (
    <>
      <Background widthBottom />
      <div className={containerStyle}>
        <h1 className={titleStyle}>Quiz</h1>
        <p className={descriptionStyle}>{t('quiz-solve-description')}</p>
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
