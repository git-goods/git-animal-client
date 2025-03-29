'use client';

import Image from 'next/image';
import { css, cx } from '_panda/css';
import { Flex } from '_panda/jsx';

import { Background } from '@/app/[locale]/quiz/_common/BackGround';
import CompleteAlertDialog from '@/app/[locale]/quiz/solve/(status)/_done/CompleteAlertDialog';
import FailAlertDialog from '@/app/[locale]/quiz/solve/(status)/_fail/FailAlertDialog';
import QuizProgressBar from '@/app/[locale]/quiz/solve/(status)/_solving/QuizProgressBar';
import useQuizAction from '@/app/[locale]/quiz/solve/(status)/_solving/useQuizAction';
import useQuizDialogStatus from '@/app/[locale]/quiz/solve/(status)/_solving/useQuizDialogStatus';
import CorrectConfirmDialog from '@/app/[locale]/quiz/solve/(status)/_success/CorrectConfirmDialog';
import { QUIZ_ANSWER, QUIZ_POINT_MAP, QUIZ_TOTAL_STAGE } from '@/app/[locale]/quiz/solve/solveQuiz.constants';
import { useSolveQuizContext } from '@/app/[locale]/quiz/solve/SolveQuizContext';
import { customScrollStyle } from '@/styles/scrollStyle';

// 임시 데이터
const difficulty = 'Easy';
const content =
  'Q. Example of Quiz ContentExample of Quiz ContentExample of Quiz ContentExample of Quiz ContentExample of Quiz ContentExample of Quiz ContentExample of Quiz ContentExample of Quiz ContentExample of Quiz ContentExample of Quiz ContentExample of Quiz ContentExample of Quiz ContentExample of Quiz ContentExample of Quiz Content?';

const SolvingQuizSection = () => {
  const { stage } = useSolveQuizContext();
  const currentPoint = QUIZ_POINT_MAP[stage - 1];

  const quizDialog = useQuizDialogStatus();
  const quizAction = useQuizAction({
    quizDialog,
  });

  const { correctDialog, failDialog, completeDialog } = quizDialog;
  const { submit, terminateQuiz, moveToNextStage, moveToQuizMain } = quizAction;

  return (
    <>
      <Background />
      <div className={containerStyle}>
        <p className={titleStyle}>
          Quiz {stage}/{QUIZ_TOTAL_STAGE}
        </p>
        <span className={difficultyStyle}>{difficulty} Level</span>
        <p className={cx(contentStyle, customScrollStyle)}>{content}</p>
        <div className={bottomContainerStyle}>
          <p className={noticeStyle}>Choose the correct answer!</p>
          <QuizProgressBar progress={30} />
          <Flex gap="8px" marginTop="24px">
            <button className={oxButtonStyle} title="O" onClick={() => submit(QUIZ_ANSWER.YES)}>
              <Image src="/quiz/ox_o.webp" alt="O" width={60} height={60} />
            </button>
            <button className={oxButtonStyle} title="X" onClick={() => submit(QUIZ_ANSWER.NO)}>
              <Image src="/quiz/ox_x.webp" alt="X" width={60} height={60} />
            </button>
          </Flex>
        </div>
      </div>
      <CorrectConfirmDialog
        isOpen={correctDialog.isOpen}
        onClose={correctDialog.close}
        onStop={terminateQuiz}
        onConfirm={moveToNextStage}
        currentPoint={currentPoint}
      />
      <FailAlertDialog isOpen={failDialog.isOpen} onClose={moveToQuizMain} />
      <CompleteAlertDialog isOpen={completeDialog.isOpen} onClose={terminateQuiz} completePoint={currentPoint} />
    </>
  );
};

export default SolvingQuizSection;

const containerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  padding: '40px 16px',
  overflow: 'hidden',
});

const titleStyle = css({
  marginBottom: '24px',
  textStyle: 'glyph40.bold',
  fontFamily: 'Product Sans',
  fontWeight: 700,
  color: 'white',
});

const difficultyStyle = css({
  width: 'fit-content',
  marginBottom: '12px',
  padding: '6px 12px',
  backgroundColor: 'white.white_10',
  borderRadius: '6px',
  textStyle: 'glyph12.regular',
  fontFamily: 'Product Sans',
  fontWeight: 400,
  color: 'white.white_50',
});

const contentStyle = css({
  textStyle: 'glyph16.regular',
  fontFamily: 'Product Sans',
  fontWeight: 400,
  color: 'white.white_75',
  flexShrink: 1,
  height: '100%',
  overflowY: 'auto',
});

const bottomContainerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  width: '100%',
});

const noticeStyle = css({
  marginBottom: '12px',
  textStyle: 'glyph15.bold',
  textAlign: 'center',
  fontFamily: 'Product Sans',
  fontWeight: 700,
  color: 'white',
});

const oxButtonStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '76px',
  background:
    'linear-gradient(132.51deg, rgba(255, 253, 201, 0.8) 2.19%, rgba(150, 230, 216, 0.8) 49.24%, rgba(125, 171, 241, 0.8) 98.21%)',
  borderRadius: '10px',
  border: '3px solid',
  borderColor: 'white.white_75',
});
