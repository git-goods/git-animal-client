'use client';

import { css } from '_panda/css';
import { shopQueries } from '@gitanimals/react-query';
import { Button } from '@gitanimals/ui-panda';
import { wrap } from '@suspensive/react';
import { useQuery } from '@tanstack/react-query';

export const BackgroundSection = wrap
  .ErrorBoundary({ fallback: <></> })
  .Suspense({ fallback: <></> })
  .on(function BackgroundSection() {
    const { data } = useQuery(shopQueries.backgroundOptions());
    console.log('data: ', data);

    return (
      <div className={sectionCss}>
        <h2 className={h2Css}>Background</h2>
        <div className={contentCss}>
          {data?.backgrounds.map((item) => (
            <div className={cardCss} key={item.type}>
              {/* <Image src={item.image} alt={item.type} /> */}
              <div className={cardImageCss}> {item.type}</div>
              <div className={cardPointStyle}>{item.price} P</div>
              <Button variant="secondary">Buy</Button>
            </div>
          ))}
        </div>
      </div>
    );
  });

const sectionCss = css({
  position: 'relative',
  display: 'flex',
  flexDir: 'column',
  alignItems: 'center',
  padding: '120px 20px',
  width: '100%',
  bg: '#6DE575',
});

const h2Css = css({
  textStyle: 'glyph82.bold',
  color: 'black',
  marginBottom: '80px',
});

const contentCss = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '20px',
  maxWidth: 'min(1120px, 100%)',
  width: '100%',
});

const cardCss = css({
  width: '100%',
  display: 'flex',
  flexDir: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const cardImageCss = css({
  width: '100%',
  aspectRatio: '2 / 1',
  bg: 'white',
});

const cardPointStyle = css({
  textStyle: 'glyph18.bold',
  color: 'black.black_75',
  border: '1px solid #3FB458',
  background: '#56CA6F',
  mt: '4px',
  mb: 24,
  p: '4px 25px',
  w: '100%',
});
