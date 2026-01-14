import { cn } from '@gitanimals/ui-tailwind';

export function ErrorSection(props: { title: string; description: string }) {
  return (
    <div
      className={cn(
        'bg-gray-900 flex flex-col items-center justify-center p-8',
        'relative overflow-hidden gap-4'
      )}
    >
      {/* 배경 패턴 효과 */}
      <div
        className="absolute top-0 left-0 right-0 h-1/2 bg-gray-800 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* 메인 제목 */}
      <h2 className="text-white font-product text-glyph-24 text-center relative z-[1]">
        {props.title}
      </h2>
      <p className="text-gray-400 font-product text-glyph-16 text-center relative z-[1]">
        {props.description}
      </p>
    </div>
  );
}
