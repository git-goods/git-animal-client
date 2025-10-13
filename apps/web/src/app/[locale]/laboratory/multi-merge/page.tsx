import { LaboratoryLayout } from '../_component/LaboratoryLayout';
import PetMergeUI from './client';

export default function MultiMergePage() {
  return (
    <LaboratoryLayout
      title="펫 합치기"
      description="펫을 선택하여 한번에 합칠 수 있어요. 여러 펫을 효율적으로 합쳐보세요!"
      laboratoryId="multi-merge"
    >
      <PetMergeUI />
    </LaboratoryLayout>
  );
}
