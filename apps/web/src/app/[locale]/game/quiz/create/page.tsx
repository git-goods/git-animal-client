import { getTranslations } from 'next-intl/server';
import { css } from '_panda/css';
import { ChevronLeft } from 'lucide-react';

import DevModePage from '@/components/DevMode/DevModePage';
import { ROUTE } from '@/constants/route';
import { Link } from '@/i18n/routing';

import QuizCreateForm from './_components/QuizCreateForm';

async function CreateQuizPage({ searchParams }: { searchParams: { devMode?: string } }) {
  const t = await getTranslations('Quiz');

  return (
    <DevModePage devMode={searchParams.devMode}>
      <div className={containerStyle}>
        <div className={headingStyle}>
          <h1 className={titleStyle}>
            <Link href={ROUTE.GAME.QUIZ.MAIN()}>
              <ChevronLeft className={headingPrevButtonStyle} size={24} color="white" />
            </Link>
            {t('create-quiz-card-title')}
          </h1>
        </div>
        <QuizCreateForm />
      </div>
    </DevModePage>
  );
}

export default CreateQuizPage;

const containerStyle = css({
  width: '100%',
  height: '100%',
  minHeight: 'calc(100vh - var(--mobile-header-height))',
  padding: '12px 16px',
  backgroundColor: 'gray.gray_050',
});

const headingStyle = css({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '44px',
});

const headingPrevButtonStyle = css({
  position: 'absolute',
  top: '10px',
  left: '0',
  cursor: 'pointer',
});

const titleStyle = css({
  textStyle: 'glyph18.bold',
  fontFamily: 'Product Sans',
  fontWeight: 700,
  color: 'white',
});
