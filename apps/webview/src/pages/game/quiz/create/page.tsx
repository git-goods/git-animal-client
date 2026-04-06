'use client';

import { useTranslation } from 'react-i18next';
import { ChevronLeft } from 'lucide-react';

import { ROUTES } from '@/router/constants';
import { Link } from 'react-router-dom';

import QuizCreateForm from './_components/QuizCreateForm';

function CreateQuizPage() {
  const { t } = useTranslation('quiz');

  return (
    <div className="h-[var(--container-height)] w-full bg-gray-050 px-4 py-3">
      <div className="relative flex h-11 w-full flex-col items-center justify-center">
        <h1 className="font-product text-glyph-18 font-bold text-white">
          <Link to={ROUTES.GAME.QUIZ.MAIN()}>
            <ChevronLeft className="absolute left-0 top-2.5 cursor-pointer" size={24} color="white" />
          </Link>
          {t('create-quiz-card-title')}
        </h1>
      </div>
      <QuizCreateForm />
    </div>
  );
}

export default CreateQuizPage;
