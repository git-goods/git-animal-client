'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { css } from '_panda/css';
import { Button } from '@gitanimals/ui-panda';
import { ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';

import { MobileLayout } from '@/app/[locale]/quiz/_common/MobileLayout';
import QuizField from '@/app/[locale]/quiz/create/QuizField';
import QuizRadio from '@/app/[locale]/quiz/create/QuizRadioButton';
import QuizTextArea from '@/app/[locale]/quiz/create/QuizTextArea';
import useRadioGroup from '@/app/[locale]/quiz/create/useRadioGroup';

const CreateQuizSection = () => {
  const [quizContents, setQuizContents] = useState<string>('');
  const handleChangeQuizContents = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuizContents(e.target.value);
  };

  const { radioItemProps: difficultyRadioItemProps, selected: selectedDifficulty } = useRadioGroup({
    options: [
      { label: 'Easy', value: 'easy' },
      { label: 'Medium', value: 'medium' },
      { label: 'Hard', value: 'hard' },
    ],
  });

  const { radioItemProps: categoryRadioItemProps, selected: selectedCategory } = useRadioGroup({
    options: [
      { label: 'Frontend', value: 'frontend' },
      { label: 'Backend', value: 'backend' },
    ],
  });

  const { radioItemProps: correctAnswerRadioItemProps, selected: selectedCorrectAnswer } = useRadioGroup({
    options: [
      { label: 'O', value: 'TRUE' },
      { label: 'X', value: 'FALSE' },
    ],
  });

  const router = useRouter();
  const enabledToCreate = quizContents.length > 0 && selectedDifficulty && selectedCategory && selectedCorrectAnswer;
  const handleCreateQuiz = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toast.success('Quiz registered. You got 5000P!');
    router.push('/quiz');
  };

  return (
    <MobileLayout>
      <div className={containerStyle}>
        <div className={headingStyle}>
          <h1 className={titleStyle}>
            <Link href="/quiz">
              <ChevronLeft className={headingPrevButtonStyle} size={24} color="white" />
            </Link>
            Create Quiz
          </h1>
        </div>
        <form className={contentStyle}>
          <QuizField
            title="Difficulty Level"
            content={
              <QuizRadio.Group>
                {difficultyRadioItemProps.map((item) => (
                  <QuizRadio.Button key={item.value} selected={item.selected} onClick={item.onSelect}>
                    {item.label}
                  </QuizRadio.Button>
                ))}
              </QuizRadio.Group>
            }
          />
          <QuizField
            title="Category"
            content={
              <QuizRadio.Group>
                {categoryRadioItemProps.map((item) => (
                  <QuizRadio.Button key={item.value} selected={item.selected} onClick={item.onSelect}>
                    {item.label}
                  </QuizRadio.Button>
                ))}
              </QuizRadio.Group>
            }
          />
          <QuizField
            title="Quiz Contents"
            description=""
            content={
              <QuizTextArea
                value={quizContents}
                placeholder="Write down the contents of the quiz...."
                onChange={handleChangeQuizContents}
              />
            }
          />
          <QuizField
            title="Answer"
            description="Choose the correct answer for the quiz."
            content={
              <QuizRadio.Group>
                {correctAnswerRadioItemProps.map((item) => (
                  <QuizRadio.Button key={item.value} selected={item.selected} onClick={item.onSelect}>
                    {item.label}
                  </QuizRadio.Button>
                ))}
              </QuizRadio.Group>
            }
          />
          <Button className={buttonStyle} disabled={!enabledToCreate} onClick={handleCreateQuiz}>
            Create
          </Button>
        </form>
      </div>
    </MobileLayout>
  );
};

export default CreateQuizSection;

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

const contentStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

const buttonStyle = css({
  width: '100%',
  height: '40px',
  marginTop: '70px',
});
