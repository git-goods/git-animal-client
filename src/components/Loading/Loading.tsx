import Image from 'next/image';
import styled from 'styled-components';

function Loading() {
  return (
    <LoadingContainer>
      <Image src="/icon/loading.svg" width={100} height={100} alt="loading" />
    </LoadingContainer>
  );
}

export default Loading;

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  pointer-events: none;
  z-index: 99;

  display: flex;
  justify-content: center;
  align-items: center;
`;
