export default async function LaboratoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen h-fit bg-gray-150 p-6 text-white max-[1400px]:p-6">{children}</div>
  );
}
