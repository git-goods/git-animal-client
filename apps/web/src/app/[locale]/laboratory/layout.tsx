import { headers } from 'next/headers';
import { css } from '_panda/css';

import { FeedbackUpvote } from '@/app/[locale]/laboratory/_component/FeedbackUpvote';

export default async function LaboratoryLayout({ children }: { children: React.ReactNode }) {
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '';
  console.log('pathname', pathname);

  return (
    <div className={containerStyle}>
      {children}
      <FeedbackUpvote laboratoryId={pathname} />
    </div>
  );
}

const containerStyle = css({
  minHeight: '100vh',
  height: 'fit-content',
  background: 'gray.gray_150',
  padding: '24px ',
  color: 'white.white_100',

  '@media (max-width: 1400px)': {
    padding: '24px ',
  },
});
