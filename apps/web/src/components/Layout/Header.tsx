/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

function Header() {
  return <></>;
  // const { username, isLogin, profileImage } = useUser();

  // const router = useRouter();

  // const onShopClick = () => {
  //   if (isLogin) {
  //     router.push('/shop');
  //   } else {
  //     router.push(GITHUB_OAUTH_REQUEST_URL);
  //   }
  // };
  // return (
  //   <>
  //     <HeaderStyled className="header">
  //       <div>
  //         <a href="/">
  //           <Image src="/logo.svg" width={137} height={42} alt="logo" />
  //         </a>
  //       </div>
  //       <div>
  //         <nav>
  //           <ul>
  //             <li>
  //               <button onClick={onShopClick}>SHOP</button>
  //             </li>
  //             <li>
  //               <a target="_blank" href={GIT_ANIMALS_MAIN_URL}>
  //                 GITHUB
  //               </a>
  //             </li>
  //             <DevMenu />
  //           </ul>
  //         </nav>

  //         {isLogin && (
  //           <Profile href="/mypage">
  //             <>
  //               <div className="profile-image">
  //                 <img src={profileImage} alt="profile" width={160} height={160} />
  //               </div>
  //               <button className={css({ display: 'flex', alignItems: 'center' })}>
  //                 <span className="profile-name">{username}</span>
  //                 <Image src="/icon/chervon-right.svg" width={12} height={12} alt="arrow-down" />
  //               </button>
  //             </>
  //           </Profile>
  //         )}
  //       </div>
  //     </HeaderStyled>
  //   </>
  // );
}
export default Header;

const HeaderStyled = styled.header`
  max-width: 1400px;
  margin: 0 auto;
  height: 70px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  display: flex;
  justify-content: space-between;
  padding: 0 40px;

  &,
  a,
  button {
    color: #fff;
    font-family: 'SF Pro Display';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 25px; /* 166.667% */
    letter-spacing: -0.3px;
    text-decoration: none;
  }

  > div,
  nav,
  ul {
    display: flex;
    align-items: center;
  }

  nav {
    ul {
      gap: 20px;
    }
  }
`;

const Profile = styled(Link)`
  padding-left: 33px;
  display: flex;
  align-items: center;

  .profile-image {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background-color: #fff;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .profile-name {
    color: #fff;
    font-family: 'SF Pro Display';
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: 25px; /* 166.667% */
    letter-spacing: -0.3px;
    margin-right: 4px;
    margin-left: 12px;
  }
`;
