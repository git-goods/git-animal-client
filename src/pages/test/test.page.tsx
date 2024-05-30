import styled from 'styled-components';

import DottedDoubleBox from '@/components/DottedBox/DottedDoubleBox';
import DottedThreeBox from '@/components/DottedBox/DottedThreeBox';

function TestPage() {
  return (
    <Container>
      <DottedDoubleBox width={228} height={228} bgColor="red" />
      <br />
      <DottedThreeBox width={228} height={228} />
    </Container>
  );
}

export default TestPage;

const Container = styled.div`
  background-color: #e7e7e7;
  width: 100vw;
  height: 100vh;
`;
