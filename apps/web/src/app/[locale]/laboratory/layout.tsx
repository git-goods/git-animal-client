import { headers } from 'next/headers';
import { css } from '_panda/css';

export default async function LaboratoryLayout({ children }: { children: React.ReactNode }) {
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '';
  console.log('pathname', pathname);

  return (
    <div className={containerStyle}>
      {children}
      <footer>
        <p>
          실험실 기능이 마음에 드셨나요? 정식 출시를 원하시면 피드백을 남겨주세요! <button>[피드백 남기기]</button>
        </p>
      </footer>
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
