import CreateOrSolveSection from '@/app/[locale]/quiz/_createOrSolve/CreateOrSolveSection';
import GNB from '@/components/GNB/GNB';

async function QuizPage() {
  return (
    <div>
      <GNB />
      <main>
        <CreateOrSolveSection />
      </main>
    </div>
  );
}

export default QuizPage;
