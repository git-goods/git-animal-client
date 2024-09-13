import { css } from '_panda/css';

function ShopTableBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className={bgStyle}>
      <div className={tableStyle}>{children}</div>
    </div>
  );
}

export default ShopTableBackground;

const bgStyle = css({
  height: '655px',
  backgroundImage: 'url(/shop/table-bg.png)',
  backgroundSize: 'cover',
});

const tableStyle = css({
  borderCollapse: 'collapse',
  width: '100%',
  height: 'fit-content',
  verticalAlign: 'center',
});
