import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { css } from '_panda/css';
import { createQuiz } from '@gitanimals/api';
import { Button } from '@gitanimals/ui-panda';
import { toast } from 'sonner';

import QuizField from './QuizField';
import QuizTextArea from './QuizTextArea';
import Tabs from '@/components/Tabs/Tabs';
import TabsList from '@/components/Tabs/TabsList';
import TabsTrigger from '@/components/Tabs/TabsTrigger';
import useTabs from '@/components/Tabs/useTabs';

import type { QuizCategory, QuizLevel } from '../../_constants/quiz.constants';
import { QUIZ_ANSWER, QUIZ_CATEGORY, QUIZ_LEVEL, QUIZ_RESULT } from '../../_constants/quiz.constants';
import type { QuizAnswer } from '../../solve/_constants/solveQuiz.constants';

const QuizCreateForm = () => {
  const [quizContents, setQuizContents] = useState<string>('');
  const handleChangeQuizContents = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuizContents(e.target.value);
  };
  const { t, i18n } = useTranslation('quiz');

  const {
    tabsTriggerProps: levelRadioProps,
    selected: level,
    handleChange: handleChangeLevel,
  } = useTabs<QuizLevel>({
    options: [
      { label: t('easy'), value: QUIZ_LEVEL.EASY },
      { label: t('medium'), value: QUIZ_LEVEL.MEDIUM },
      { label: t('difficult'), value: QUIZ_LEVEL.DIFFICULT },
    ],
  });

  const {
    tabsTriggerProps: categoryRadioProps,
    selected: category,
    handleChange: handleChangeCategory,
  } = useTabs<QuizCategory>({
    options: [
      { label: 'Frontend', value: QUIZ_CATEGORY.FRONTEND },
      { label: 'Backend', value: QUIZ_CATEGORY.BACKEND },
    ],
  });

  const {
    tabsTriggerProps: expectedAnswerRadioProps,
    selected: expectedAnswer,
    handleChange: handleChangeExpectedAnswer,
  } = useTabs<QuizAnswer>({
    options: [
      { label: 'O', value: QUIZ_ANSWER.YES },
      { label: 'X', value: QUIZ_ANSWER.NO },
    ],
  });

  const navigate = useNavigate();
  const enabledToCreate = quizContents.length > 0 && level && category && expectedAnswer;

  const [isCreating, setIsCreating] = useState(false);
  const locale = i18n.language as 'en_US' | 'ko_KR';
  const handleCreateQuiz = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      setIsCreating(true);
      const { result, message } = await createQuiz({
        level,
        category,
        problem: quizContents,
        expectedAnswer,
        locale,
      });

      if (result === QUIZ_RESULT.SUCCESS) {
        toast.success(message);
        navigate(-1);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to create quiz. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <form className={contentStyle}>
      <QuizField
        title={t('difficulty-level')}
        content={
          <Tabs value={level} onValueChange={(value) => handleChangeLevel(value as QuizLevel)}>
            <TabsList>
              {levelRadioProps.map((item) => (
                <TabsTrigger key={item.value} value={item.value}>
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        }
      />
      <QuizField
        title={t('category')}
        content={
          <Tabs value={category} onValueChange={(value) => handleChangeCategory(value as QuizCategory)}>
            <TabsList>
              {categoryRadioProps.map((item) => (
                <TabsTrigger key={item.value} value={item.value}>
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        }
      />
      <QuizField
        title={t('quiz-contents')}
        description=""
        content={
          <QuizTextArea
            value={quizContents}
            placeholder={t('quiz-contents-description')}
            onChange={handleChangeQuizContents}
          />
        }
      />
      <QuizField
        title={t('answer-title')}
        description={t('answer-description')}
        content={
          <Tabs value={expectedAnswer} onValueChange={(value) => handleChangeExpectedAnswer(value as QuizAnswer)}>
            <TabsList>
              {expectedAnswerRadioProps.map((item) => (
                <TabsTrigger key={item.value} value={item.value}>
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        }
      />
      <Button className={buttonStyle} disabled={!enabledToCreate || isCreating} onClick={handleCreateQuiz}>
        {t('create-quiz-button')}
      </Button>
    </form>
  );
};

export default QuizCreateForm;

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
