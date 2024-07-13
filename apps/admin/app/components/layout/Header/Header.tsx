import { css } from '_panda/css';
import Nav from './Nav';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';

function Header() {
  return (
    <div className={containerStyle}>
      <Nav />
      <div className={avatarStyle}>
        <Avatar>
          <AvatarImage src="https://avatars.githubusercontent.com/u/49177223?v=4" alt="@nanopx" />
          <AvatarFallback>NP</AvatarFallback>
        </Avatar>
      </div>
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
  py: 3,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const avatarStyle = css({
  overflow: 'hidden',
  borderRadius: '50%',
  height: '100%',
  background: 'muted',
  '& span': {
    height: '100%',
    display: 'block',
    '& img': {
      borderRadius: '50%',
      height: '100%',
      width: 'auto',
    },
  },
});
