export function ErrorSection(props: { title: string; description: string }) {
  return (
    <div className="bg-gray-900 flex flex-col items-center justify-center p-8 relative overflow-hidden gap-4">
      {/* 배경 패턴 효과 */}
      <div className="absolute top-0 left-0 right-0 h-[50%] bg-gray-800 opacity-[0.3] [background-image:radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.1)_1px,_transparent_0)] [background-size:20px_20px]" />

      {/* 메인 제목 */}
      <h2 className="text-white glyph24-regular text-center relative z-[1]">{props.title}</h2>
      <p className="text-gray-400 glyph16-regular text-center relative z-[1]">{props.description}</p>
    </div>
  );
}
