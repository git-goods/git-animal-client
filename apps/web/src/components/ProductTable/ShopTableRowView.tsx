'use client';

import { css, cx } from '_panda/css';
import type { Product } from '@gitanimals/api/src/auction';

import ShopTableRowMobileView from '@/components/ProductTable/ShopTableRowMobileView';
import ShopTableRowPcView from '@/components/ProductTable/ShopTableRowPcView';
import { useGetAllPersona } from '@/hooks/query/render/useGetAllPersona';

interface Props extends Pick<Product, 'id' | 'persona' | 'price'> {
  onAction: (itemId: Product['id']) => void;
  actionLabel: string;
  actionColor: string;
}

function ShopTableRowView(props: Props) {
  const {
    data: { personas },
  } = useGetAllPersona();

  const currentPersona = personas.find((persona) => persona.type === props.persona.personaType);

  if (!currentPersona) throw new Error('unexpected persona');

  return (
    <div className={rowWrapperStyle} key={props.id}>
      <div className={pcRowStyle}>
        <ShopTableRowPcView dropRate={currentPersona.dropRate} {...props} />
      </div>
      <div className={mobileRowStyle}>
        <ShopTableRowMobileView dropRate={currentPersona.dropRate} {...props} />
      </div>
    </div>
  );
}

export default ShopTableRowView;

export function ShopTableRowViewSkeleton() {
  return <div className={cx(rowWrapperStyle, skeletonStyle)} />;
}

const skeletonStyle = css({
  background:
    'linear-gradient(90deg, token(colors.gray.800) 25%, token(colors.gray.600) 50%, token(colors.gray.200) 75%, token(colors.gray.800) 100%)',
  backgroundSize: '200% 100%',
  animation: `skeletonLoading 1.5s infinite linear`,
});

export const rowWrapperStyle = css({
  width: '100%',
  height: '80px',
  backgroundColor: 'white.white_10',
  borderRadius: '12px',

  _mobile: {
    height: '64px',
    borderRadius: '6px',
  },
});

export const pcRowStyle = css({
  display: 'block',
  width: '100%',
  height: '100%',

  _mobile: {
    display: 'none',
  },
});

export const mobileRowStyle = css({
  display: 'none',
  width: '100%',
  height: '100%',

  _mobile: {
    display: 'block',
  },
});
