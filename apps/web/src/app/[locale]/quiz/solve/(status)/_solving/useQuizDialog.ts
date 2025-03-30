import useQuizAction from '@/app/[locale]/quiz/solve/(status)/_solving/useQuizAction';
import useQuizDialogStatus from '@/app/[locale]/quiz/solve/(status)/_solving/useQuizDialogStatus';

const useQuizDialog = () => {
  const quizDialog = useQuizDialogStatus();

  const quizDialogAction = useQuizAction({
    quizDialog,
  });

  return { quizDialog, quizDialogAction };
};

export default useQuizDialog;
