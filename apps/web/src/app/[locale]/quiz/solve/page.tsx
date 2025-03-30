import { SolveQuizProvider } from '@/app/[locale]/quiz/solve/SolveQuizContext';
import SolveQuizSection from '@/app/[locale]/quiz/solve/SolveQuizSection';

async function SolveQuizPage() {
  return (
    <SolveQuizProvider>
      <SolveQuizSection />
    </SolveQuizProvider>
  );
}

export default SolveQuizPage;
