import SelectQuizType from './_components/CreateOrSolve/SelectQuizType';
import { Background } from './_components/BackGround';
import { useTranslation } from 'react-i18next';

function QuizPage() {
  const { t } = useTranslation('quiz');

  return (
    <>
      <Background widthBottom />
      <div className="flex h-full w-full flex-col items-center justify-center px-4 py-10">
        <h1 className="mb-2 font-product text-glyph-40 font-bold text-white">Quiz</h1>
        <p className="mb-12 font-product text-glyph-18 font-normal text-white/90">{t('quiz_solve_description')}</p>
        <SelectQuizType />
      </div>
    </>
  );
}

export default QuizPage;
