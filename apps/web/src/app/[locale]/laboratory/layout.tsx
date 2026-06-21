export default async function LaboratoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen h-fit bg-gray-150 p-[24px] text-white-100 [@media(max-width:1400px)]:p-[24px]">
      {children}
    </div>
  );
}
