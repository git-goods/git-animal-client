import styled from 'styled-components';

import DottedDoubleBox from '@/components/DottedBox/DottedDoubleBox';
import DottedThreeBox from '@/components/DottedBox/DottedThreeBox';
import Modal from '@/components/Modal/Modal';

function TestPage() {
  return (
    <Container>
      <br />

      <Modal
        isOpen={true}
        onClose={() => {
          console.log('close');
        }}
      >
        <DottedThreeBox width={228} height={228} bgColor="#ffffff10">
          asdasd
        </DottedThreeBox>
        <DottedDoubleBox width={228} height={228} bgColor="red">
          ad
        </DottedDoubleBox>
      </Modal>
    </Container>
  );
}

export default TestPage;

const Container = styled.div`
  background-color: #e7e7e7;
  width: 100vw;
  height: 100vh;
`;
