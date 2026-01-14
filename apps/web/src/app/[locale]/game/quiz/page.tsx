import { getTranslations } from 'next-intl/server';

import { Background } from '@/app/[locale]/game/quiz/_components/BackGround';

import SelectQuizType from './_components/CreateOrSolve/SelectQuizType';

async function QuizPage() {
  const t = await getTranslations('Quiz');

  return (
    <>
      <Background widthBottom />
      <div className="flex flex-col justify-center items-center w-full h-full p-[40px_16px]">
        <h1 className="mb-2 font-product text-glyph-40 font-bold text-white">Quiz</h1>
        <p className="mb-12 font-product text-glyph-18 font-normal text-white-90">{t('quiz-solve-description')}</p>
        <SelectQuizType />
      </div>
    </>
  );
}

export default QuizPage;
