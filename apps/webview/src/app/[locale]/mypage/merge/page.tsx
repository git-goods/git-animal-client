import { MergePersona } from './client';

export default async function MergePage(props: {
  searchParams: Promise<{
    personaId: string;
  }>;
}) {
  const { personaId } = await props.searchParams;
  return <MergePersona targetPersonaId={personaId} />;
}
