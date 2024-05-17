import React from 'react';
import styled from 'styled-components';

function Footer() {
  return (
    <FooterStyled>
      <button>
        <img src="/icon/github.png" alt="github" width={24} height={24} />
      </button>
      <p>
        made by <a href="https://github.com/sumi-0011">sumi-0011</a>
      </p>
    </FooterStyled>
  );
}

export default Footer;

const FooterStyled = styled.footer`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  right: 0;
  padding: 24px;

  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  align-items: flex-end;
  color: #fff;
  line-height: 140%;
  gap: 4px;
  a {
    color: #fff;
    text-decoration: underline;
    text-underline-offset: 5px;
    padding-left: 6px;
  }
`;
