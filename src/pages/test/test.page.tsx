import React from 'react';
import styled from 'styled-components';

function TestPage() {
  return (
    <Container>
      <Box />
    </Container>
  );
}

export default TestPage;

const Container = styled.div`
  background-color: #e7e7e7;
  width: 100vw;
  height: 100vh;
`;

function Box() {
  const width = 512;

  return (
    <svg width={width} height="164" viewBox={`"0 0 ${width} 164"`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x={width - 12} y="4" width="4" height="4" fill="#141414" />
      <rect x={width - 8} y="8" width="4" height="4" fill="#141414" />
      <rect x={width - 12} y="156" width="4" height="4" fill="#141414" />
      <rect x={width - 8} y="152" width="4" height="4" fill="#141414" />
      <rect x={width - 4} y="12" width="4" height="140" fill="#141414" />
      <rect width="4" height="4" transform="matrix(-1 0 0 1 12 4)" fill="#141414" />
      <rect width="4" height="4" transform="matrix(-1 0 0 1 8 8)" fill="#141414" />
      <rect width="4" height="4" transform="matrix(-1 0 0 1 12 156)" fill="#141414" />
      <rect width="4" height="4" transform="matrix(-1 0 0 1 8 152)" fill="#141414" />
      <rect width="4" height="140" transform="matrix(-1 0 0 1 4 12)" fill="#141414" />
      <rect x="12" width={width - 24} height="4" fill="#141414" />
      <rect x="12" y="160" width={width - 24} height="4" fill="#141414" />
    </svg>
  );
}
