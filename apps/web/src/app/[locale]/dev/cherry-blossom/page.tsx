'use client';

import DevModePage from '@/components/DevMode/DevModePage';

import { CherryBlossom } from '../../landing/(spring)/CherryBlossom';

const VARIANT_LABELS = ['Variant 0: 큰 4방향 꽃 (11x11)', 'Variant 1: 다이아몬드 꽃 (7x7)', 'Variant 2: 작은 꽃잎 (3x3)', 'Variant 3: 점 (2x2)'];

const SIZES = [12, 20, 28, 36, 48];

export default function CherryBlossomDemoPage() {
  return (
    <DevModePage>
      <div className={pageStyle}>
        <h1 className={titleStyle}>Cherry Blossom Particle Demo</h1>

        {/* Static variants */}
        <section className={sectionStyle}>
          <h2 className={subtitleStyle}>Static Variants (sizes: {SIZES.join(', ')}px)</h2>
          <div className={gridStyle}>
            {[0, 1, 2, 3].map((variant) => (
              <div key={variant} className={cardStyle}>
                <p className={labelStyle}>{VARIANT_LABELS[variant]}</p>
                <div className={rowStyle}>
                  {SIZES.map((size) => (
                    <div key={size} className={itemStyle}>
                      <CherryBlossom
                        delay={0}
                        left="50%"
                        size={size}
                        duration={999999}
                        variant={variant}
                        opacity={1}
                      />
                      <span className={sizeLabelStyle}>{size}px</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Animated preview */}
        <section className={sectionStyle}>
          <h2 className={subtitleStyle}>Animated Preview</h2>
          <div className={previewStyle}>
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

const pageStyle =
  'p-[40px] bg-[linear-gradient(180deg,#E8F4FD_0%,#FFF0F5_40%,#FFE4EE_70%,#FFDBEE_100%)] min-h-[100vh]';

const titleStyle = 'text-[32px] font-[700] text-[#333] mb-[32px]';

const subtitleStyle = 'text-[20px] font-[600] text-[#555] mb-[16px]';

const sectionStyle = 'mb-[48px]';

const gridStyle = 'flex flex-col gap-[24px]';

const cardStyle = 'bg-[rgba(255,255,255,0.7)] rounded-[12px] p-[20px]';

const labelStyle = 'text-[14px] font-[600] text-[#666] mb-[12px]';

const rowStyle = 'flex items-end gap-[32px]';

const itemStyle = 'flex flex-col items-center gap-[8px] relative w-[60px] h-[60px]';

const sizeLabelStyle = 'text-[11px] text-[#999] absolute bottom-[-4px]';

const previewStyle =
  'relative w-full h-[400px] overflow-hidden rounded-[12px] bg-[linear-gradient(180deg,#E8F4FD_0%,#FFF0F5_40%,#FFE4EE_70%,#FFDBEE_100%)]';
