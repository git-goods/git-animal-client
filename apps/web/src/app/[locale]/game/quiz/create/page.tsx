import { getTranslations } from 'next-intl/server';
import { ChevronLeft } from 'lucide-react';

import { ROUTE } from '@/constants/route';
import { Link } from '@/i18n/routing';

import QuizCreateForm from './_components/QuizCreateForm';

async function CreateQuizPage() {
  const t = await getTranslations('Quiz');

  return (
    <div className="w-full h-full min-h-[calc(100vh-var(--mobile-header-height))] p-[12px_16px] bg-gray-050">
      <div className="relative flex flex-col justify-center items-center w-full h-[44px]">
        <h1 className="font-product text-glyph-18 font-bold text-white">
          <Link href={ROUTE.GAME.QUIZ.MAIN()}>
            <ChevronLeft className="absolute top-[10px] left-0 cursor-pointer" size={24} color="white" />
          </Link>
          {t('create-quiz-card-title')}
        </h1>
      </div>
      <QuizCreateForm />
    </div>
  );
}

export default CreateQuizPage;
