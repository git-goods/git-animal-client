import { css } from '_panda/css';

export default function LaboratoryLayout({ children }: { children: React.ReactNode }) {
  return <div className={containerStyle}>{children}</div>;
}
const containerStyle = css({
  minHeight: '100vh',
  height: 'fit-content',
  backgroundColor: '#019C5A',
  padding: '120px 200px',
  color: 'white.white_100',

  '@media (max-width: 1400px)': {
    padding: '120px 100px',
  },
});
