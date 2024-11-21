import { css } from '_panda/css';
import Nav from './Nav';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';

const PROFILE_IMG = 'https://avatars.githubusercontent.com/u/171903401?s=200&v=4';
function Header() {
  return (
    <div className={containerStyle}>
      <Nav />
      <div className={avatarStyle}>
        <Avatar>
          <AvatarImage src={PROFILE_IMG} alt="@gitanimals" />
        </Avatar>
      </div>
    </div>
  );
}

export default Header;

const containerStyle = css({
  h: '16px',
  bg: 'background',
  shadow: 'md',
  zIndex: 'sticky',
  px: '4px',
  py: '3px',

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
