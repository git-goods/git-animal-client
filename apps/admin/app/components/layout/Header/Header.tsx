import { css } from '_panda/css';
import Nav from './Nav';

function Header() {
  return (
    <div className={containerStyle}>
      <Nav />
    </div>
  );
}

export default Header;

const containerStyle = css({
  h: '16',
  bg: 'background',
  shadow: 'md',
  zIndex: 'sticky',
  px: 4,

  display: 'flex',
  alignItems: 'center',
});
