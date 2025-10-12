import { css } from '_panda/css';

import { FeedbackUpvote } from '@/app/[locale]/laboratory/_component/FeedbackUpvote';

export default async function LaboratoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={containerStyle}>
      {children}
      <FeedbackUpvote />
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
