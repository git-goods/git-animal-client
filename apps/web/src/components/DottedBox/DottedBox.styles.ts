import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: inline-block;
  overflow: hidden;
  background-color: transparent;
  box-sizing: border-box;
  padding: 8px;
  z-index: 0;

  & > svg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
`;
