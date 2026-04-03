'use client';

import DevModePage from '@/app/[locale]/dev/_components/DevModePage';

import { CherryBlossom } from '../../landing/(spring)/CherryBlossom';

const VARIANT_LABELS = ['Variant 0: 큰 4방향 꽃 (11x11)', 'Variant 1: 다이아몬드 꽃 (7x7)', 'Variant 2: 작은 꽃잎 (3x3)', 'Variant 3: 점 (2x2)'];

const SIZES = [12, 20, 28, 36, 48];

export default function CherryBlossomDemoPage() {
  return (
    <DevModePage>
      <div className="p-10 bg-gradient-to-b from-[#E8F4FD] via-[#FFF0F5] via-[70%] to-[#FFDBEE] min-h-screen">
        <h1 className="text-[32px] font-bold text-[#333] mb-8">Cherry Blossom Particle Demo</h1>

        {/* Static variants */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-[#555] mb-4">Static Variants (sizes: {SIZES.join(', ')}px)</h2>
          <div className="flex flex-col gap-6">
            {[0, 1, 2, 3].map((variant) => (
              <div key={variant} className="bg-white/70 rounded-xl p-5">
                <p className="text-sm font-semibold text-[#666] mb-3">{VARIANT_LABELS[variant]}</p>
                <div className="flex items-end gap-8">
                  {SIZES.map((size) => (
                    <div key={size} className="flex flex-col items-center gap-2 relative w-[60px] h-[60px]">
                      <CherryBlossom
                        delay={0}
                        left="50%"
                        size={size}
                        duration={999999}
                        variant={variant}
                        opacity={1}
                      />
                      <span className="text-[11px] text-[#999] absolute -bottom-1">{size}px</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Animated preview */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-[#555] mb-4">Animated Preview</h2>
          <div className="relative w-full h-[400px] overflow-hidden rounded-xl bg-gradient-to-b from-[#E8F4FD] via-[#FFF0F5] via-[70%] to-[#FFDBEE]">
            {[...Array(16)].map((_, i) => {
              const variant = i % 4;
              return (
                <CherryBlossom
                  key={i}
                  delay={i * 0.4}
                  left={`${5 + (i / 16) * 90}%`}
                  size={10 + Math.random() * 18}
                  duration={12 + Math.random() * 5}
                  variant={variant}
                  opacity={0.6 + Math.random() * 0.3}
                />
              );
            })}
          </div>
        </section>
      </div>
    </DevModePage>
  );
}
