'use client';

import { css } from '_panda/css';

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

const pageStyle = css({
  padding: '40px',
  background: 'linear-gradient(180deg, #E8F4FD 0%, #FFF0F5 40%, #FFE4EE 70%, #FFDBEE 100%)',
  minHeight: '100vh',
});

const titleStyle = css({
  fontSize: '32px',
  fontWeight: 700,
  color: '#333',
  marginBottom: '32px',
});

const subtitleStyle = css({
  fontSize: '20px',
  fontWeight: 600,
  color: '#555',
  marginBottom: '16px',
});

const sectionStyle = css({
  marginBottom: '48px',
});

const gridStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

const cardStyle = css({
  background: 'rgba(255,255,255,0.7)',
  borderRadius: '12px',
  padding: '20px',
});

const labelStyle = css({
  fontSize: '14px',
  fontWeight: 600,
  color: '#666',
  marginBottom: '12px',
});

const rowStyle = css({
  display: 'flex',
  alignItems: 'flex-end',
  gap: '32px',
});

const itemStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  position: 'relative',
  width: '60px',
  height: '60px',
});

const sizeLabelStyle = css({
  fontSize: '11px',
  color: '#999',
  position: 'absolute',
  bottom: '-4px',
});

const previewStyle = css({
  position: 'relative',
  width: '100%',
  height: '400px',
  overflow: 'hidden',
  borderRadius: '12px',
  background: 'linear-gradient(180deg, #E8F4FD 0%, #FFF0F5 40%, #FFE4EE 70%, #FFDBEE 100%)',
});
