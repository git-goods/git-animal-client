import type { PropsWithChildren } from 'react';
import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

function Layout({ children }: PropsWithChildren) {
  return (
    <Container>
      <Image src="/bg.png" fill alt="bg" />
      {children}
    </Container>
  );
}

export default Layout;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  min-width: fit-content;
  min-width: 1400px;
  > img {
    z-index: -1;
    object-fit: cover;
  }

  > main {
    min-height: 100vh;
    z-index: 1;
  }
`;
