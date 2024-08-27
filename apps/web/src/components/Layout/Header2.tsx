/* eslint-disable @next/next/no-img-element */

import Image from 'next/image';
import Link from 'next/link';
import { css } from '_panda/css';
import { center } from '_panda/patterns';

import { getServerAuth } from '@/auth';
import { GITHUB_OAUTH_REQUEST_URL } from '@/constants/oauth';
import { GIT_ANIMALS_MAIN_URL } from '@/constants/outlink';
import { checkIdDevAccessPossible } from '@/utils/dev';

async function Header() {
  const session = await getServerAuth();

  const isLogin = Boolean(session);
  const username = session?.user.name ?? '';

  const isDevAccessPossible = checkIdDevAccessPossible(username);

  return (
    <header className={headerStyle}>
      <div>
        <Link href="/">
          <Image src="/logo.svg" width={137} height={42} alt="logo" />
        </Link>
      </div>
      <div>
        <nav>
          <ul>
            {isLogin && (
              <>
                <li>
                  <Link href="/mypage">MYPAGE</Link>
                </li>
                <li>
                  <Link href="/shop">SHOP</Link>
                </li>
              </>
            )}
            {!isLogin && (
              <li>
                <a href={GITHUB_OAUTH_REQUEST_URL}>Login</a>
              </li>
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
          </ul>
        </nav>

        {session && (
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
        )}
      </div>
    </header>
  );
}
export default Header;

const headerStyle = css({
  maxWidth: '1400px',
  margin: '0 auto',
  height: '70px',
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 40px',
  color: '#fff',
  fontFamily: 'SF Pro Display',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '25px',
  letterSpacing: '-0.3px',
  textDecoration: 'none',
  '& > div, nav, ul': {
    display: 'flex',
    alignItems: 'center',
  },
  '& nav ul': {
    gap: '20px',
  },
});

// const Profile = styled(Link)`
//   padding-left: 33px;
//   display: flex;
//   align-items: center;

//   .profile-image {
//     width: 45px;
//     height: 45px;
//     border-radius: 50%;
//     background-color: #fff;
//     overflow: hidden;

//     img {
//       width: 100%;
//       height: 100%;
//     }
//   }

//   .profile-name {
//     color: #fff;
//     font-family: 'SF Pro Display';
//     font-size: 15px;
//     font-style: normal;
//     font-weight: 500;
//     line-height: 25px; /* 166.667% */
//     letter-spacing: -0.3px;
//     margin-right: 4px;
//     margin-left: 12px;
//   }
// `;

const profileStyle = css({
  padding: '0 33px',
  display: 'flex',
  alignItems: 'center',
  '& .profile-image': {
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    backgroundColor: '#fff',
    overflow: 'hidden',
    '& img': {
      width: '100%',
      height: '100%',
    },
  },
  '& .profile-name': {
    color: '#fff',
    fontSize: '15px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '25px',
    letterSpacing: '-0.3px',
    marginRight: '4px',
    marginLeft: '12px',
  },
});
