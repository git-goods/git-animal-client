import CreateQuizSection from '@/app/[locale]/quiz/create/CreateQuizSection';
import GNB from '@/components/GNB/GNB';

async function CreateQuizPage() {
  return (
    <div>
      <GNB />
      <main>
        <CreateQuizSection />
      </main>
    </div>
  );
}

export default CreateQuizPage;
