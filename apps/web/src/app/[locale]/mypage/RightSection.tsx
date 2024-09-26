import { usePathname } from '@/i18n/routing';

function RightSection({ type }: { type: string }) {
  const pathname = usePathname();

  return (
    <section>
      <div>
        {/* {selectedType === '1-type' && <OneType />}
        {selectedType === 'farm-type' && <FarmType />} */}
      </div>
    </section>
  );
}

export default RightSection;
