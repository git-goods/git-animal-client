/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

function Header() {
  return (
    <>
      <HeaderStyled>
        <div>
          <Image src="/logo.svg" width={137} height={42} alt="logo" />
        </div>
        <div>
          <nav>
            <ul>
              <li>
                <Link href="#">SHOP</Link>
              </li>
              <li>
                <a href="#">GITHUB</a>
              </li>
            </ul>
          </nav>
          <Profile>
            <div className="profile-image"></div>
            <button>
              <span className="profile-name">Devxb</span>
              <Image src="/icon/chervon-right.svg" width={12} height={12} alt="arrow-down" />
            </button>
          </Profile>
        </div>
      </HeaderStyled>
    </>
  );
}
export default Header;

const HeaderStyled = styled.header`
  max-width: 1200px;
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
  a {
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

const Profile = styled.div`
  padding-left: 33px;
  display: flex;
  align-items: center;

  .profile-image {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background-color: #fff;
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
