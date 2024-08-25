import Image from 'next/image';
import Link from 'next/link';
import { flex } from '_panda/patterns';
import { Button } from '@gitanimals/ui-panda';

import { getServerAuth } from '@/auth';
import LoginButton from '@/components/LoginButton';
import { GIT_ANIMALS_MAIN_URL } from '@/constants/outlink';
import { DEV_USERNAMES } from '@/utils/dev';

async function Header() {
  const session = await getServerAuth();

  const isLogin = Boolean(session);
  const username = session?.user.name ?? '';

  const isDevAccessPossible = DEV_USERNAMES.includes(username);

  return (
    <header className={headerStyle}>
      <Link href="/">
        <Image src="/main/gnb_right_logo.svg" width={154} height={42} alt="logo" />
      </Link>
      <div>
        <ul className={navStyle}>
          {isLogin && (
            <>
              <li>
                <Link href="/mypage">MYPAGE</Link>
              </li>
              <li>
                <Link href="/shop">Auction</Link>
              </li>
            </>
          )}

          <li>
            <a target="_blank" href={GIT_ANIMALS_MAIN_URL}>
              GITHUB
            </a>
          </li>
          {/* <DevMenu /> */}
          {isDevAccessPossible && (
            <li>
              <Link href="/dev">DEV</Link>
            </li>
          )}
          {!isLogin && (
            <li>
              <LoginButton>
                {/* <a href={GITHUB_OAUTH_REQUEST_URL}> */}
                <Button>Login</Button>
              </LoginButton>
              {/* </a> */}
            </li>
          )}
        </ul>

        {/* {session && (
          <a href="/mypage" className={profileStyle}>
            <>
              <div className="profile-image">
                <img src={session.user.image} alt="profile" width={160} height={160} />
              </div>
              <button className={center()}>
                <span className="profile-name">{session.user.name}</span>
                <Image src="/icon/chervon-right.svg" width={12} height={12} alt="arrow-down" />
              </button>
            </>
          </a>
        )} */}
      </div>
    </header>
  );
}
export default Header;
const headerStyle = flex({
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 20px',
  height: 60,
  backgroundColor: 'white',
  boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.1)',
  zIndex: 100,
  position: 'fixed',
  top: 0,
  width: '100%',
});

const navStyle = flex({
  textStyle: 'glyph16.regular',
  gap: '32px',
  alignItems: 'center',
});
