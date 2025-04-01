import Link from 'next/link';
import { css } from '_panda/css';
import { ChevronLeft } from 'lucide-react';

import QuizCreateForm from './_components/QuizCreateForm';

function CreateQuizPage() {
  return (
    <div className={containerStyle}>
      <div className={headingStyle}>
        <h1 className={titleStyle}>
          <Link href="/quiz">
            <ChevronLeft className={headingPrevButtonStyle} size={24} color="white" />
          </Link>
          Create Quiz
        </h1>
      </div>
      <QuizCreateForm />
    </div>
  );
}

export default CreateQuizPage;

const containerStyle = css({
  width: '100%',
  height: '100vh',
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
