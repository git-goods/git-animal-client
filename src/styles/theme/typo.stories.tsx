import styled from 'styled-components';

const meta = {
  title: 'Typography',
  component: Typography,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

export function Typography() {
  return (
    <div>
      <p>global pink color</p>
      <Styled>styled red color</Styled>
    </div>
  );
}

const Styled = styled.div`
  color: ${({ theme }) => theme.testColor};
`;
