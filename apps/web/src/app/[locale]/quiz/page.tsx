import QuizOrSolveSection from '@/app/[locale]/quiz/_quizOrSolve/QuizOrSolveSection';
import GNB from '@/components/GNB/GNB';

async function QuizPage() {
  return (
    <div>
      <GNB />
      <main>
        <QuizOrSolveSection />
      </main>
    </div>
  );
}

export default QuizPage;
