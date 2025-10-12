import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { css } from '_panda/css';

import { Link } from '@/i18n/routing';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('page');

  return {
    title: t('laboratory'),
  };
}

const list = [
  {
    title: '레벨, 타입 같은 펫 한번에 팔기',
    description: '펫 레벨, 타입 등 펫 속성을 선택하여 한번에 팔 수 있어요.',
    href: '/laboratory/property-pet-sell',
  },
  {
    title: '펫 합치기',
    description: '펫을 선택하여 한번에 합칠 수 있어요.',
    href: '/laboratory/multi-merge',
  },
];

export default function LaboratoryPage() {
  return (
    <div className={contentStyle}>
      {list.map((item) => (
        <Card key={item.href} href={item.href}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </Card>
      ))}
    </div>
  );
}

function Card({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <Link href={href} className={cardStyle}>
      {children}
    </Link>
  );
}

const contentStyle = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '16px',
});

const cardStyle = css({
  background: 'white.white_10',
  backdropFilter: 'blur(7px)',
  borderRadius: '16px',
  p: 8,
  display: 'flex',
  gap: '10px',
  textStyle: 'glyph16.regular',
  color: 'white.white_100',
  flexDirection: 'column',

  '& h2 ': {
    textStyle: 'glyph24.bold',
  },

  '& p': {
    textStyle: 'glyph16.regular',
  },

  _hover: {
    background: 'white.white_20',
    transform: 'translateY(-2px)',
    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
    transition: 'background 0.3s ease, transform 0.3s ease',
  },
});
