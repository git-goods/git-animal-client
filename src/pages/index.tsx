import styled from 'styled-components';

export default function Home() {
  return (
    <main>
      <TestComponent>Red color</TestComponent>
      <p>Pink color</p>
    </main>
  );
}

const TestComponent = styled.div`
  color: ${({ theme }) => theme.testColor};
`;
