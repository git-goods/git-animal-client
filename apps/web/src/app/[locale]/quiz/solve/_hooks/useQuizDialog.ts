import useQuizAction from '@/app/[locale]/quiz/solve/_hooks/useQuizAction';
import useQuizDialogStatus from '@/app/[locale]/quiz/solve/_hooks/useQuizDialogStatus';

const useQuizDialog = () => {
  const quizDialog = useQuizDialogStatus();

  const quizDialogAction = useQuizAction({
    quizDialog,
  });

  return { quizDialog, quizDialogAction };
};

export default useQuizDialog;
