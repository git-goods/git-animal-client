'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { css } from '_panda/css';
import { Button } from '@gitanimals/ui-panda';
import { ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';

import QuizField from '@/app/[locale]/quiz/create/_components/QuizField';
import QuizTextArea from '@/app/[locale]/quiz/create/_components/QuizTextArea';
import Tabs from '@/components/Tabs/Tabs';
import TabsList from '@/components/Tabs/TabsList';
import TabsTrigger from '@/components/Tabs/TabsTrigger';
import useTabs from '@/components/Tabs/useTabs';

const CreateQuizSection = () => {
  const [quizContents, setQuizContents] = useState<string>('');
  const handleChangeQuizContents = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuizContents(e.target.value);
  };

  const {
    tabsTriggerProps: difficultyTabsTriggerProps,
    selected: selectedDifficulty,
    handleChange: handleChangeDifficulty,
  } = useTabs({
    options: [
      { label: 'Easy', value: 'easy' },
      { label: 'Medium', value: 'medium' },
      { label: 'Hard', value: 'hard' },
    ],
  });

  const {
    tabsTriggerProps: categoryTabsTriggerProps,
    selected: selectedCategory,
    handleChange: handleChangeCategory,
  } = useTabs({
    options: [
      { label: 'Frontend', value: 'frontend' },
      { label: 'Backend', value: 'backend' },
    ],
  });

  const {
    tabsTriggerProps: correctAnswerTabsTriggerProps,
    selected: selectedCorrectAnswer,
    handleChange: handleChangeCorrectAnswer,
  } = useTabs({
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
            <Tabs value={selectedDifficulty} onValueChange={handleChangeDifficulty}>
              <TabsList>
                {difficultyTabsTriggerProps.map((item) => (
                  <TabsTrigger key={item.value} value={item.value}>
                    {item.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          }
        />
        <QuizField
          title="Category"
          content={
            <Tabs value={selectedCategory} onValueChange={handleChangeCategory}>
              <TabsList>
                {categoryTabsTriggerProps.map((item) => (
                  <TabsTrigger key={item.value} value={item.value}>
                    {item.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
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
            <Tabs value={selectedCorrectAnswer} onValueChange={handleChangeCorrectAnswer}>
              <TabsList>
                {correctAnswerTabsTriggerProps.map((item) => (
                  <TabsTrigger key={item.value} value={item.value}>
                    {item.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          }
        />
        <Button className={buttonStyle} disabled={!enabledToCreate} onClick={handleCreateQuiz}>
          Create
        </Button>
      </form>
    </div>
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
