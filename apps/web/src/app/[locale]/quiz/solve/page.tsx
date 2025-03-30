import { SolveQuizProvider } from '@/app/[locale]/quiz/solve/_components/SolveQuizContext';
import SolveQuizSection from '@/app/[locale]/quiz/solve/_components/SolveQuizSection';

async function SolveQuizPage() {
  return (
    <SolveQuizProvider>
      <SolveQuizSection />
    </SolveQuizProvider>
  );
}

export default SolveQuizPage;
